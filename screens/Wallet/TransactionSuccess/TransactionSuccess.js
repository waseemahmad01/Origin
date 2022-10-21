import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';

import ConfettiCannon from 'react-native-confetti-cannon';

import assets from '../../../assets';
import Button from '../../../components/Button/Button';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const TransactionSuccess = ({navigation, route}) => {
  const data = route?.params?.data;
  const [show, setShow] = useState(true);
  console.log(data);
  return (
    <>
      <ImageBackground
        source={assets.background}
        style={{
          flex: 1,
        }}>
        <SafeAreaView
          style={{
            flex: 1,
          }}>
          <View
            style={{
              paddingHorizontal: 24,

              flex: 1,
            }}>
            <ImageBackground
              source={assets.containerBox}
              style={{
                flex: 1,
                marginBottom: 24,
                marginTop: isIos ? 40 : 40 + StatusBar.currentHeight,
                borderRadius: 24,
                overflow: 'hidden',
                alignItems: 'center',
                padding: 24,
              }}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={assets.success2}
                  style={{marginTop: 44, marginBottom: 51}}
                />

                <Text style={styles.transactTitle}>Transaction Successful</Text>

                <Text style={styles.subtitle}>
                  You just added
                  <Text
                    style={{
                      fontWeight: '600',
                      color: theme.COLORS.grey900,
                    }}>
                    {' '}
                    {data?.amount_of_tokens} Gcoins
                  </Text>{' '}
                  to your wallet from this wallet{' '}
                  <Text
                    style={{
                      fontWeight: '600',
                      color: theme.COLORS.grey900,
                    }}>
                    {data?.target_wallet_address}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  zIndex: 4,
                  elevation: 8,
                }}>
                <Button
                  label="Done"
                  onPress={() => {
                    // setAdd(false);
                    // setModalVisible(false);
                    navigation.navigate('My-Wallet');
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {show && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}>
          <ConfettiCannon
            fadeOut={true}
            count={200}
            autoStart={true}
            origin={{x: -10, y: 0}}
            onAnimationEnd={() => setShow(false)}
          />
        </View>
      )}
    </>
  );
};

export default TransactionSuccess;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 1,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 0,
  },
  logo: {
    marginBottom: '-27%',
    zIndex: 5,
    // position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    marginTop: 84,
    alignItems: 'center',
  },
  transactTitle: {
    ...theme.TYPOGRAPHY.h3,

    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 8,
    color: theme.COLORS.green,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '400',
    color: theme.COLORS.grey700,
    lineHeight: 24,
    textAlign: 'center',
  },
});
