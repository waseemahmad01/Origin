import React from 'react';

import {View, Image, StyleSheet, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import assets from '../../assets';
import theme from '../../theme';

const SplashScreen = () => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.7)']}
      // locations={[0, 0.5]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      {/* <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.container}>
        <View>
          <Image source={assets.logo} style={styles.logo} />
        </View>
      </View> */}
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: theme.COLORS.white,
  // },
});
