import React, {useState} from 'react';

import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {object, string} from 'yup';
import {validate} from '../../utils/validations';
import {useDispatch, useSelector} from 'react-redux';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

const schema = object({
  firstname: string().required().label('Firstname'),
  lastname: string().required().label('Lastname'),
  username: string().required().label('Username'),
});

import theme from '../../theme';

const UserProfile = ({handleContinue}) => {
  const dispatch = useDispatch();
  const {firstname, lastname, username} = useSelector(state => state.auth);
  const [userData, setUserData] = useState({
    firstname: firstname || '',
    lastname: lastname || '',
    username: username || '',
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (text, name) => {
    setUserData(prev => ({...prev, [name]: text}));
    setErrors(prev => ({...prev, [name]: null}));
  };

  const handleClick = async () => {
    const validationErrors = await validate(schema, userData);
    if (validationErrors) {
      return setErrors(validationErrors);
    }
    dispatch.auth.setFirstname(userData.firstname);
    dispatch.auth.setLastname(userData.lastname);
    dispatch.auth.setUsername(userData.username);
    handleContinue();
  };

  return (
    <View style={{flexGrow: 1}}>
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <Text
          style={[
            theme.TYPOGRAPHY.h3,
            {textAlign: 'center', color: theme.COLORS.blue},
          ]}>
          What is your name and username?
        </Text>

        <Text
          style={[
            theme.TYPOGRAPHY.body1,
            styles.subtitle,
            {fontWeight: '400', lineHeight: 24, textAlign: 'center'},
          ]}>
          Enter the name that appears on your{' '}
          <Text style={{fontWeight: '600'}}>driver’s license, state ID</Text>,
          or <Text style={{fontWeight: '600'}}>passport</Text>.
        </Text>

        <View style={{...styles.fieldContainer, marginTop: 24}}>
          <InputField
            label="First name"
            value={userData.firstname}
            onChangeText={text => handleChange(text, 'firstname')}
            error={errors?.firstname}
          />
        </View>
        <View style={styles.fieldContainer}>
          <InputField
            label="Last name"
            value={userData.lastname}
            onChangeText={text => handleChange(text, 'lastname')}
            error={errors?.lastname}
          />
        </View>
        <View style={{...styles.fieldContainer, marginBottom: 20}}>
          <InputField
            label="Username"
            value={userData.username}
            onChange={text => handleChange(text, 'username')}
            error={errors?.username}
          />
        </View>
      </ScrollView>
      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleClick}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 8,
    color: theme.COLORS.grey700,
  },
  privacyPolicy: {
    marginTop: 100,
  },
  fieldContainer: {
    marginTop: 20,
  },
});
