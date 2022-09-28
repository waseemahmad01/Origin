import React, {useState} from 'react';

import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import assets from '../../assets';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';

import theme from '../../theme';

const MobileVerification = ({handleContinue}) => {
  const [number, setNumber] = useState('');

  return (
    <View style={{flexGrow: 1}}>
      <Text style={[theme.TYPOGRAPHY.h2, styles.title]}>
        What’s your mobile number?
      </Text>

      <InputField
        label="Mobile number"
        keyboardType="phone-pad"
        value={number}
        onChange={setNumber}
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          ...styles.privacyPolicy,
        }}>
        <Pressable>
          <Image source={assets.checkbox} />
        </Pressable>
        <View style={{paddingLeft: 15}}>
          <Text style={[theme.TYPOGRAPHY.body2]}>
            I agree to Origen’s Terms of Use, Privacy Policy, and Acceptable Use
            Policy.
          </Text>
        </View>
      </View>

      <Button
        label="I agree"
        style={{marginTop: 'auto'}}
        onPress={handleContinue}
      />
    </View>
  );
};

export default MobileVerification;

const styles = StyleSheet.create({
  title: {
    marginBottom: 50,
  },
  subtitle: {
    marginTop: 58,
  },
  privacyPolicy: {
    marginTop: 100,
  },
});
