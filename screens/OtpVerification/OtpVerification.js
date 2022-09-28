import React from 'react';

import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import Button from '../../components/Button/Button';

import theme from '../../theme';
import assets from '../../assets';

const OtpVerification = ({handleContinue}) => {
  return (
    <View style={{flexGrow: 1}}>
      <Text style={[theme.TYPOGRAPHY.h2]}>
        Enter the 4-digit verification code sent to: (818) 515-7997
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <OTPInputView
          pinCount={4}
          editable
          keyboardType="number-pad"
          //   autoFocusOnLoad
          style={{width: '60%', height: 200}}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />

        <Image
          source={assets.verify}
          style={{height: 20, width: 20}}
          resizeMode="cover"
        />
      </View>

      <Pressable style={{marginTop: 58}}>
        <Text style={theme.TYPOGRAPHY.body1}>Resend code</Text>
      </Pressable>
      <Pressable>
        <Text style={theme.TYPOGRAPHY.body1}>Edit mobile number</Text>
      </Pressable>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleContinue}
      />
    </View>
  );
};

export default OtpVerification;

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
  borderStyleBase: {
    width: 44,
    height: 45,
    borderColor: '#C6C6C6',
  },

  borderStyleHighLighted: {
    borderColor: '#C6C6C6',
  },

  underlineStyleBase: {
    width: 44,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#C6C6C6',
    fontSize: 20,
    color: theme.COLORS.black,
  },

  underlineStyleHighLighted: {
    borderColor: '#C6C6C6',
  },
});
