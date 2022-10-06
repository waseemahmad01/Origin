import React, {useState, useEffect} from 'react';
import OtpInputs from 'react-native-otp-inputs';

import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../../components/Button/Button';

import theme from '../../theme';
import assets from '../../assets';

const OtpVerification = ({handleContinue}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [otp, setOtp] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const handleClick = () => {
    if (isValid) {
      dispatch.auth.verifyOtp({otp, handleContinue, setError});
    }
  };

  useEffect(() => {
    if (otp.length === 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [otp]);

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
          marginTop: 64,
        }}>
        <OtpInputs
          numberOfInputs={4}
          style={{flexDirection: 'row'}}
          handleChange={code => setOtp(code)}
          inputStyles={{
            width: 44,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderColor: '#C6C6C6',
            fontSize: 20,
            color: theme.COLORS.black,
            marginLeft: 15,
            textAlign: 'center',
          }}
        />
        {/* <OTPInputView
          pinCount={4}
          editable
          keyboardType="number-pad"
          //   autoFocusOnLoad
          style={{width: '60%', height: 50}}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtp(code);
          }}
        /> */}
        {isValid && (
          <Image
            source={assets.verify}
            style={{height: 20, width: 20}}
            resizeMode="cover"
          />
        )}
      </View>
      {error && (
        <Text style={{...theme.TYPOGRAPHY.error, marginTop: 5}}>{error}</Text>
      )}

      <Pressable style={{marginTop: 58}}>
        <Text style={theme.TYPOGRAPHY.body1}>Resend code</Text>
      </Pressable>
      <Pressable>
        <Text style={theme.TYPOGRAPHY.body1}>Edit mobile number</Text>
      </Pressable>

      <Button
        label="Continue"
        style={{marginTop: 'auto'}}
        onPress={handleClick}
        loading={loading}
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
