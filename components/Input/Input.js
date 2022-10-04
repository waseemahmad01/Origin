import React, {useState} from 'react';

import {Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import theme from '../../theme';

const Input = ({title = 'Label', error, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <TextInput
        style={{
          ...styles.input,
          borderColor: error
            ? theme.COLORS.error
            : isFocused
            ? '#6E6E7E'
            : 'transparent',
        }}
        placeholder={title}
        placeholderTextColor="#6E6E7E"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && <Text style={styles.errMsg}>{error}</Text>}
    </KeyboardAvoidingView>
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
  errMsg: {
    ...theme.TYPOGRAPHY.error,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});
