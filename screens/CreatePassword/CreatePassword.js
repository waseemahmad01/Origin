import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {object, string, ref} from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import theme from '../../theme';
import {validate} from '../../utils/validations';

const schema = object({
  password: string().required().min(6).label('Password'),
  confirm_password: string()
    .oneOf(
      [ref('password'), null],
      'Password and confirm password must be same',
    )
    .required()
    .min(6)
    .label('Confirm password'),
});

const CreatePassword = ({handleContinue, navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState(null);
  const handleChange = (text, name) => {
    setFormData(prev => ({...prev, [name]: text}));
    setErrors(prev => ({...prev, [name]: null}));
  };

  const handleClick = async () => {
    const validationErrors = await validate(schema, formData);
    if (validationErrors) {
      return setErrors(validationErrors);
    }
    console.log(formData);
    dispatch.auth.signUp({passwords: formData, handleContinue});
  };
  return (
    <View style={{flexGrow: 1}}>
      <Text
        style={[
          theme.TYPOGRAPHY.h3,
          {color: theme.COLORS.blue, textAlign: 'center'},
        ]}>
        Create a password
      </Text>

      <Text style={[theme.TYPOGRAPHY.body1, styles.subtitle]}>
        Please create a password using the security guidelines below.
      </Text>

      <View style={styles.fieldContainer}>
        <InputField
          label="Password"
          value={formData.password}
          onChange={text => handleChange(text, 'password')}
          secureTextEntry
          error={errors?.password}
        />
      </View>
      <View style={styles.fieldContainer}>
        <InputField
          label="Confirm password"
          value={formData.confirm_password}
          onChange={text => handleChange(text, 'confirm_password')}
          secureTextEntry
          error={errors?.confirm_password}
        />
      </View>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        loading={loading}
        onPress={
          () => handleClick()
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'Wallet'}],
          // })
        }
      />
    </View>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    color: theme.COLORS.grey700,
  },
  privacyPolicy: {
    marginTop: 100,
  },
  fieldContainer: {
    marginTop: 50,
  },
});
