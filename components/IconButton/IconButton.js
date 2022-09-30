import React from 'react';

import LinearGradient from 'react-native-linear-gradient';

import {Pressable, StyleSheet} from 'react-native';
import theme from '../../theme';

const IconButton = ({children, onPress, style}) => {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        style={{
          ...styles.gradient,
          ...style,
        }}
        colors={[theme.COLORS.primary, theme.COLORS.secondary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {children}
      </LinearGradient>
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
