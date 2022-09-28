import React, {useState} from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import theme from '../../theme';

const UserProfile = ({handleContinue}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  return (
    <View style={{flexGrow: 1}}>
      <ScrollView style={{flexGrow: 1}}>
        <Text style={[theme.TYPOGRAPHY.h2]}>
          What is your name and username?
        </Text>

        <Text style={[theme.TYPOGRAPHY.body2, styles.subtitle]}>
          Enter the name that appears on your driver’s license, state ID, or
          passport.
        </Text>

        <View style={styles.fieldContainer}>
          <InputField
            label="First name"
            value={firstname}
            onChange={setFirstname}
          />
        </View>
        <View style={styles.fieldContainer}>
          <InputField
            label="Last name"
            value={lastname}
            onChange={setLastname}
          />
        </View>
        <View style={{...styles.fieldContainer, marginBottom: 20}}>
          <InputField
            label="Username"
            value={username}
            onChange={setUsername}
          />
        </View>
      </ScrollView>
      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleContinue}
      />
    </View>
  );
};

export default UserProfile;

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
