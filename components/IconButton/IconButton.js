import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {ImageBackground, Pressable, StyleSheet} from 'react-native';
import theme from '../../theme';
import assets from '../../assets';

const IconButton = ({children, onPress, style, containerStyle}) => {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <ImageBackground
        source={assets.iconBtnBg}
        style={{
          ...styles.gradient,
          ...style,
        }}>
        {children}
      </ImageBackground>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  gradient: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
