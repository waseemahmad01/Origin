import React, {useState} from 'react';

import {
  View,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
} from 'react-native';

import MobileVerification from '../MobileVerification/MobileVerification';
import UserProfile from '../UserProfile/UserProfile';
import UserEmail from '../UserEmail/UserEmail';
import CreatePassword from '../CreatePassword/CreatePassword';
import OtpVerification from '../OtpVerification/OtpVerification';

import assets from '../../assets';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import BuyNumber from '../BuyNumber/BuyNumber';

const screens = {
  0: MobileVerification,
  1: OtpVerification,
  2: UserProfile,
  3: UserEmail,
  4: CreatePassword,
  5: BuyNumber,
};

const isIos = Platform.OS === 'ios';

const Register = ({navigation}) => {
  const [active, setActive] = useState(0);

  const handleBackClick = () => {
    if (active === 0) {
      return;
    } else {
      setActive(active - 1);
    }
  };

  const handleContinue = () => {
    setActive(active + 1);
  };

  const Component = screens[active];

  return (
    <ImageBackground
      style={{flex: 1}}
      source={assets.background}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.mainContainer}>
          <View style={styles.indiCatorRow}>
            <Pressable onPress={handleBackClick}>
              <Image
                style={{
                  height: 32,
                  width: 32,
                }}
                source={assets.chevronLeft}
              />
            </Pressable>
            <LinearGradient
              style={styles.indicatorContainer}
              colors={['#FFFFFF', '#FFFFFF00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              {Array.from({length: 6}, (_, i) => i).map(i => {
                if (i < active) {
                  return (
                    <Image
                      style={{width: 10, height: 10, marginRight: 18}}
                      source={assets.verify}
                    />
                  );
                } else {
                  return (
                    <View
                      key={i}
                      style={{
                        ...styles.indicator,
                        marginRight: i === 5 ? 0 : 21,
                        backgroundColor:
                          i <= active
                            ? theme.COLORS.green
                            : theme.COLORS.grey500,
                      }}></View>
                  );
                }
              })}
            </LinearGradient>
            <View style={{width: 32}}></View>
          </View>
          <ImageBackground
            source={assets.containerBox}
            style={styles.containerBox}>
            <View
              style={{
                ...styles.container,
              }}>
              <View style={{flexGrow: 1}}>
                <Component
                  handleContinue={handleContinue}
                  navigation={navigation}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
    // paddingVertical: 38,
  },
  indiCatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A5A6B3',
    marginRight: 28,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 8 / 2,
    marginRight: 16,
  },
  containerBox: {
    flexGrow: 1,
    borderRadius: 24,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingTop: isIos ? 27 : 27 + StatusBar.currentHeight,
  },
});
