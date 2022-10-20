import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  Modal,
} from 'react-native';
import assets from '../../../assets';
import Button from '../../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../../components/InputField/InputField';

import theme from '../../../theme';
import useBiometrics from '../../../hooks/useBiometrics';

const isIos = Platform.OS === 'ios';

const VerifyPassword = ({
  navigation,
  setVerify,
  verify,
  setVerifyTransaction,
}) => {
  const {handleBiometric, sensorAvailable} = useBiometrics();
  const [password, setPassword] = useState('');
  return (
    <Modal visible={verify} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}> Verify your password</Text>
          <Text
            style={{
              ...theme.TYPOGRAPHY.body1,
              color: theme.COLORS.grey700,
              textAlign: 'center',
              marginBottom: 32,
              fontWeight: '400',
            }}>
            Press enter your password below
          </Text>
          <View>
            <InputField
              secureTextEntry
              label="Enter Password"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.btnContainer}>
            <View style={{flexGrow: 1, marginRight: 16}}>
              <Button
                label="Submit"
                onPress={() => {
                  setVerifyTransaction(true);
                  setVerify(false);
                }}
              />
            </View>
            <View>
              {sensorAvailable && (
                <Pressable
                  onPress={async () => {
                    const result = await handleBiometric();
                    setVerifyTransaction(result);
                    setVerify(false);
                  }}
                  style={{
                    height: 48,
                    width: 48,
                    borderRadius: 52 / 2,
                    backgroundColor: theme.COLORS.green,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={assets.faceIdWhite}
                    style={{
                      height: 24,
                      width: 24,
                    }}
                    resizeMode="cover"
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VerifyPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.blue,
    marginBottom: 8,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
  },
  gradient: {
    flex: 1,
    // flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 0,
  },
  top: {
    paddingHorizontal: 24,
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
    elevation: 2,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginTop: 27.5,
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    backgroundColor: '#F5FCF9',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  newAddressText: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#6E6E7E',
  },
  balance: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 8,
    marginLeft: 24,
  },
  innerContainer: {
    backgroundColor: theme.COLORS.white,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
});
