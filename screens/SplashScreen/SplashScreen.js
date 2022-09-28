import React from 'react';

import {View, Image, StyleSheet} from 'react-native';

import assets from '../../assets';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={assets.logo} style={styles.logo} />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
