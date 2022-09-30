import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';

const GButton = ({label = 'label', style, ...rest}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <TouchableOpacity {...rest} style={[styles.container]}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default GButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
  },
});
