import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import theme from '../../theme';

const UserEmail = ({handleContinue}) => {
  const [email, setEmail] = useState('');
  return (
    <View style={{flexGrow: 1}}>
      <Text style={[theme.TYPOGRAPHY.h2]}>What’s your email?</Text>

      <Text style={[theme.TYPOGRAPHY.body2, styles.subtitle]}>
        Enter an email address to receive updates and notifications.
      </Text>

      <View style={styles.fieldContainer}>
        <InputField label="Email" value={email} onChange={setEmail} />
      </View>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleContinue}
      />
    </View>
  );
};

export default UserEmail;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 9,
  },
  privacyPolicy: {
    marginTop: 100,
  },
  fieldContainer: {
    marginTop: 50,
  },
});
