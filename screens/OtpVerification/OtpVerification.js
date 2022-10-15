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
      <Text
        style={[
          theme.TYPOGRAPHY.h3,
          {color: theme.COLORS.blue, textAlign: 'center'},
        ]}>
        Enter the 4-digit verification code sent to:
      </Text>
      <Text
        style={[
          theme.TYPOGRAPHY.h3,
          {color: theme.COLORS.darkBlue, textAlign: 'center'},
        ]}>
        {' '}
        (818) 515-7997
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 24,
        }}>
        <OtpInputs
          numberOfInputs={4}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
          handleChange={code => setOtp(code)}
          inputStyles={{
            width: 60,
            height: 48,
            borderRadius: 24,
            borderWidth: 0,
            borderWidth: 1,
            borderColor: theme.COLORS.grey200,
            fontSize: 20,
            fontWeight: '700',
            color: theme.COLORS.grey900,
            textAlign: 'center',
          }}
          placeholder="-"
          placeholderTextColor={theme.COLORS.grey200}
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
        {/* {isValid && (
          <Image
            source={assets.verify}
            style={{height: 20, width: 20}}
            resizeMode="cover"
          />
        )} */}
      </View>
      {error && (
        <Text style={{...theme.TYPOGRAPHY.error, marginTop: 5}}>{error}</Text>
      )}

      <Pressable style={{...styles.links, marginTop: 25}}>
        <Image
          source={assets.resend}
          style={{
            height: 24,
            width: 24,
            marginRight: 16,
          }}
        />
        <Text
          style={{
            ...theme.TYPOGRAPHY.body1,
            fontWeight: '600',
            color: theme.COLORS.blue,
          }}>
          Resend code
        </Text>
      </Pressable>
      <Pressable style={styles.links}>
        <Image
          style={{
            height: 24,
            width: 24,
            marginRight: 16,
          }}
          source={assets.edit}
        />
        <Text
          style={{
            ...theme.TYPOGRAPHY.body1,
            fontWeight: '600',
            color: theme.COLORS.blue,
          }}>
          Edit mobile number
        </Text>
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
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
});
