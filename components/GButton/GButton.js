import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme';

const GButton = ({label = 'label', style, loading, textStyle, ...rest}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <TouchableOpacity {...rest} style={[styles.container]} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.COLORS.white} />
        ) : (
          <Text style={{...styles.text, ...textStyle}}>{label}</Text>
        )}
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
