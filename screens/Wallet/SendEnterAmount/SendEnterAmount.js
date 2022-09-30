import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';

import theme from '../../../theme';
import assets from '../../../assets';
import Button from '../../../components/GButton/GButton';
import Input from '../../../components/Input/Input';

import AsyncStorage from '@react-native-async-storage/async-storage';

const isIos = Platform.OS === 'ios';

const SendEnterAmount = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.top}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              ...styles.header,
            }}>
            <Text style={styles.headerTitle}>Send</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.closeIcon}
                style={{
                  height: 24,
                  width: 24,
                }}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.middle}>
          <Text style={styles.textContainer}>
            <Text style={styles.newAddressText}>
              New address detected. Click{' '}
            </Text>
            <Text
              style={{
                ...styles.newAddressText,
                color: theme.COLORS.primary,
              }}>
              here
            </Text>
            <Text style={styles.newAddressText}>
              {' '}
              to add to your address book.
            </Text>
          </Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <View>
              <Input title="Username" />
            </View>
            <View style={{marginTop: 20}}>
              <Input title="Amount" />
            </View>
            <Text style={styles.balance}>
              Balance:{' '}
              <Text style={{color: theme.COLORS.primary}}>2.6345 GCoins</Text>
            </Text>
          </View>

          <Button
            label="Send"
            style={{marginTop: 'auto'}}
            onPress={async () => {
              const verified = await AsyncStorage.getItem('verify');
              if (verified !== 'true') {
                return navigation.navigate('Send-Verify');
              }
              navigation.navigate('Transaction-success');
            }}
          />
        </View>

        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SendEnterAmount;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
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
});
