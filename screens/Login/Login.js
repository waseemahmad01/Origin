import React, {useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import {object, string} from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import assets from '../../assets';
import Button from '../../components/GButton/GButton';
import Input from '../../components/Input/Input';
import theme from '../../theme';
import {validate} from '../../utils/validations';

const isIos = Platform.OS === 'ios';

const schema = object({
  password: string().required().label('Password'),
  phone_number: string().required().label('Phone'),
});

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [formData, setFormData] = useState({
    phone_number: '',
    password: '',
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (text, name) => {
    setFormData(prev => ({...prev, [name]: text}));
    setErrors(prev => ({...prev, [name]: null}));
  };

  const handleLogin = async () => {
    const validationErrors = await validate(schema, formData);
    if (validationErrors) {
      return setErrors(validationErrors);
    }
    dispatch.auth.login({formData, navigation});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Image
          source={assets.noTextLogo}
          style={{
            height: 100.64,
            width: 91.5,
          }}
        />
        <Text style={styles.title}>Sign in</Text>
        <View style={{width: '100%', marginBottom: 24}}>
          <Input
            title="Phone"
            value={formData.phone_number}
            onChangeText={text => handleChange(text, 'phone_number')}
            error={errors?.phone_number}
          />
        </View>
        <View style={{width: '100%', marginBottom: 24}}>
          <Input
            title="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={text => handleChange(text, 'password')}
            error={errors?.password}
          />
        </View>
        <View style={{width: '100%', marginBottom: 24}}>
          <Button label="Sign in" onPress={handleLogin} loading={loading} />
        </View>
        <Text style={styles.text}>Forgot Password?</Text>
        <Text style={{...styles.text, marginTop: 16}}>
          Don’t have an account?{' '}
          <Text
            style={{color: theme.COLORS.primary}}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: isIos ? 0 : StatusBar.currentHeight,
  },
  title: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginTop: 70,
    marginBottom: 32,
  },
  text: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    color: '#6E6E7E',
    fontWeight: '400',
  },
});
