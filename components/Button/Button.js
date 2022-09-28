import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

const Button = ({label = 'label', style, ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={[styles.container, style]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.COLORS.primary,
    height: 44,
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
