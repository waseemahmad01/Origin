import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import assets from '../../assets';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import CheckBoxTic from '../../components/CheckboxTic/CheckBoxTic';

import theme from '../../theme';

const MobileVerification = ({handleContinue}) => {
  const dispatch = useDispatch();
  const {loading, phone_number} = useSelector(state => state.auth);
  const [number, setNumber] = useState(phone_number || '');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState('');

  const handleClick = () => {
    setError('');
    if (isValid) {
      dispatch.auth.generateOTP({number, handleContinue});
      console.log('Valid number');
    } else {
      console.log('Invalid');
      setError('Invalid mobile number');
    }
  };

  useEffect(() => {
    if (number.match(/^\+(?:[0-9] ?){6,14}[0-9]$/)) {
      setIsValid(true);
      setError(null);
    } else {
      setIsValid(false);
    }
  }, [number]);

  return (
    <View style={{flexGrow: 1}}>
      <Text style={[theme.TYPOGRAPHY.h3, styles.title]}>
        What’s your mobile number?
      </Text>

      <InputField
        label="Mobile number"
        keyboardType="phone-pad"
        value={number}
        onChange={setNumber}
        error={error}
        isValid={isValid}
      />
      <Text
        style={[
          theme.TYPOGRAPHY.body2,
          styles.subtitle,
          {fontFamily: 'SF Pro Display'},
        ]}>
        By entering your mobile number, you consent to receive notices and
        updates related to your account via text message. Standard message rates
        may apply.
      </Text>

      <View style={{marginTop: 'auto'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            ...styles.privacyPolicy,
          }}>
          <CheckBoxTic />
          <View style={{paddingLeft: 15}}>
            <Text style={[theme.TYPOGRAPHY.body1]}>
              I agree to Origen’s{' '}
              <Text style={{color: theme.COLORS.blue}}>Terms of Use</Text>,{' '}
              <Text style={{color: theme.COLORS.blue}}>Privacy Policy</Text>,
              and{' '}
              <Text style={{color: theme.COLORS.blue}}>
                Acceptable Use Policy
              </Text>
              .
            </Text>
          </View>
        </View>
        <Button
          label="I agree"
          style={{marginTop: 'auto'}}
          onPress={handleClick}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default MobileVerification;

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: theme.COLORS.blue,
  },
  subtitle: {
    marginTop: 16,
    paddingHorizontal: 16,
    color: theme.COLORS.grey700,
  },
  privacyPolicy: {
    marginTop: 100,
    marginVertical: 24,
    color: theme.COLORS.grey900,
  },
});
