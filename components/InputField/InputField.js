import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  Pressable,
  Text,
  Image,
} from 'react-native';
import theme from '../../theme';
import assets from '../../assets';

const InputField = ({
  value,
  onChange,
  label = 'label',
  Icon,
  error,
  secureTextEntry,
  isValid,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [floatLabel, setFloatLabel] = useState(false);
  const [password, setPassword] = useState(secureTextEntry || false);

  const anim = useRef(new Animated.Value(0)).current;
  const input = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    setFloatLabel(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value.length) {
      setFloatLabel(true);
    } else {
      setFloatLabel(false);
    }
  };

  useEffect(() => {
    Animated.timing(anim, {
      toValue: floatLabel ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [anim, floatLabel]);

  useEffect(() => {
    if (value.length) {
      setFloatLabel(true);
    }
  }, [value]);

  return (
    <>
      <Pressable
        onPress={() => {
          input.current.focus();
          handleFocus();
        }}>
        <View
          style={{
            ...styles.container,
            borderColor: error ? 'red' : theme.COLORS.grey,
          }}>
          <TextInput
            ref={input}
            style={{
              ...styles.input,
              borderColor: error
                ? theme.COLORS.danger
                : isFocused
                ? theme.COLORS.blue
                : theme.COLORS.grey200,
            }}
            placeholder={label}
            placeholderTextColor={theme.COLORS.grey500}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={onChange}
            secureTextEntry={password}
            autoCapitalize={false}
            autoCorrect={false}
            {...rest}
          />
          {secureTextEntry && (
            <Pressable
              style={{...styles.icon, zIndex: 1}}
              onPress={() => setPassword(!password)}>
              <Image
                source={password ? assets.hidden : assets.visible}
                style={{
                  height: 24,
                  width: 24,
                  marginTop: -7,
                }}
              />
            </Pressable>
          )}
          {isValid && (
            <View style={styles.icon}>
              <Image
                source={assets.verify}
                style={{height: 12, width: 15}}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </Pressable>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    height: 48,
    fontSize: 16,
    fontWeight: '400',
    color: theme.COLORS.grey900,
    fontFamily: 'SF Pro Display',
    textTransform: 'none',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  label: {
    position: 'absolute',
    fontSize: 20,
    top: 6,
    zIndex: 1,
    color: '#666666',
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
  },
  errorMsg: {
    ...theme.TYPOGRAPHY.error,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    marginTop: -5,
    right: 20,
  },
});
