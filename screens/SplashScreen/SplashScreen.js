import React from 'react';

import {View, Image, StyleSheet, StatusBar} from 'react-native';

import assets from '../../assets';
import theme from '../../theme';

const SplashScreen = () => {
  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.container}>
        <View>
          <Image source={assets.logo} style={styles.logo} />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.COLORS.white,
  },
});
