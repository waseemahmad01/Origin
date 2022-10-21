import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '../../theme';

const Button = ({label = 'label', style, labelStyle, loading, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,

        {
          backgroundColor: loading
            ? theme.COLORS.darkGreen
            : theme.COLORS.green,
        },
        style,
      ]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={theme.COLORS.white} />
      ) : (
        <Text style={[styles.text, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.COLORS.green,
    height: 48,
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
