import React, {useState} from 'react';

import {View, Text, StyleSheet, TextInput} from 'react-native';
import theme from '../../theme';

const Input = ({title = 'Label', ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.input,
          borderColor: isFocused ? '#6E6E7E' : 'transparent',
        }}
        placeholder={title}
        placeholderTextColor="#6E6E7E"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F5FCF9',
    height: 52,
    borderRadius: 32,
    paddingHorizontal: 24,
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#1D1D35',
    lineHeight: null,
    borderWidth: 1,
  },
});
