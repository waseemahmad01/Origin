import React from 'react';

import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
  Text,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import assets from '../../assets';
import theme from '../../theme';

const height = Dimensions.get('window').height;

const SplashScreen = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={assets.background}
      resizeMode="cover">
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ImageBackground
        style={styles.inner}
        source={assets.splashbg}
        resizeMode="cover">
        <View></View>
        <View style={styles.logoContainer}>
          <Image source={assets.brandLogo} />
          <Text style={styles.title}>Origin</Text>
        </View>
        <ActivityIndicator size="large" color={theme.COLORS.blue} />
      </ImageBackground>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 24,
  },
  inner: {
    height: height * 0.7,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 29,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 60,
    marginTop: 25,
    color: theme.COLORS.grey900,
  },
});
