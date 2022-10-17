import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {object, string} from 'yup';
import {useSelector, useDispatch} from 'react-redux';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import theme from '../../theme';
import {validate} from '../../utils/validations';

const shcema = object({
  email: string().email().required().label('Email'),
});

const UserEmail = ({handleContinue}) => {
  const dispatch = useDispatch();
  const mail = useSelector(state => state.auth.email);
  const [email, setEmail] = useState(mail || '');
  const [error, setError] = useState(null);
  const handleClick = async () => {
    setError(null);
    const validationErrors = await validate(shcema, {email});
    if (validationErrors) {
      return setError(validationErrors.email);
    }
    dispatch.auth.setEmail(email);
    handleContinue();
  };
  return (
    <View style={{flexGrow: 1}}>
      <Text
        style={[
          theme.TYPOGRAPHY.h3,
          {color: theme.COLORS.blue, textAlign: 'center'},
        ]}>
        What’s your email?
      </Text>

      <Text style={[theme.TYPOGRAPHY.body1, styles.subtitle]}>
        Enter an email address to receive updates and notifications.
      </Text>

      <View style={styles.fieldContainer}>
        <InputField
          label="Email"
          value={email}
          onChange={setEmail}
          error={error}
        />
      </View>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleClick}
      />
    </View>
  );
};

export default UserEmail;

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
