import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import theme from '../../theme';

const CreatePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <View style={{flexGrow: 1}}>
      <Text style={[theme.TYPOGRAPHY.h2]}>Create a password</Text>

      <Text style={[theme.TYPOGRAPHY.body2, styles.subtitle]}>
        Please create a password using the security guidelines below.
      </Text>

      <View style={styles.fieldContainer}>
        <InputField
          label="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <InputField
          label="Confirm password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Wallet'}],
          })
        }
      />
    </View>
  );
};

export default CreatePassword;

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
