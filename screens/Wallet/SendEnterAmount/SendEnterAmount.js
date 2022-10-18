import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  StatusBar,
  Pressable,
  ImageBackground,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {object, string} from 'yup';

import theme from '../../../theme';
import assets from '../../../assets';
import Button from '../../../components/Button/Button';
import InputField from '../../../components/InputField/InputField';
import VerifyPassword from './VerifyPassword';

import {validate} from '../../../utils/validations';

const isIos = Platform.OS === 'ios';

const schema = object({
  target_wallet_address: string().required().label('Wallet address'),
  amount_of_tokens: string().required().label('Amount'),
});

const SendEnterAmount = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.selectedUser);
  const loading = useSelector(state => state.wallet.loading);
  const balance = useSelector(state => state.wallet.balance);
  const [verify, setVerify] = useState(false);
  const [formData, setFormData] = useState({
    target_wallet_address: user?.origen_public_wallet_address || '',
    amount_of_tokens: '',
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (text, name) => {
    setFormData(prev => ({...prev, [name]: text}));
    setErrors(prev => ({...prev, [name]: null}));
  };

  const handleTransferToken = async () => {
    const validationErrors = await validate(schema, formData);
    if (validationErrors) {
      return setErrors(validationErrors);
    }
    if (formData.amount_of_tokens <= 0) {
      return setErrors(prev => ({
        ...prev,
        amount_of_tokens: 'Amount must be greater than 0',
      }));
    }
    dispatch.wallet.transferToken({formData, navigation});
  };
  return (
    <>
      <ImageBackground
        source={assets.background}
        resizeMode="cover"
        style={{
          ...styles.gradient,
          paddingTop: isIos ? 0 : StatusBar.currentHeight,
        }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.top}>
            <View
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                ...styles.header,
              }}>
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  source={assets.chevronLeft}
                  style={{
                    height: 32,
                    width: 32,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
              <Text style={styles.headerTitle}>Send</Text>
              <View style={{width: 32}} />
            </View>
          </View>

          <ImageBackground source={assets.containerBox} style={styles.bottom}>
            <View style={styles.middle}>
              <Image
                source={assets.info}
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 12,
                }}
              />
              <Text style={styles.textContainer}>
                <Text style={styles.newAddressText}>
                  New address detected. Click{' '}
                </Text>
                <Text
                  style={{
                    ...styles.newAddressText,
                    color: theme.COLORS.primary,
                  }}>
                  here
                </Text>
                <Text style={styles.newAddressText}>
                  {' '}
                  to add to your address book.
                </Text>
              </Text>
            </View>
            <View>
              <View>
                <InputField
                  label="Wallet address"
                  value={formData.target_wallet_address}
                  disabled
                  error={errors?.target_wallet_address}
                />
              </View>
              <View style={{marginTop: 20}}>
                <InputField
                  label="Amount"
                  value={formData.amount_of_tokens}
                  onChangeText={text => handleChange(text, 'amount_of_tokens')}
                  keyboardType="number-pad"
                  error={errors?.amount_of_tokens}
                />
              </View>
              <Text style={styles.balance}>
                Balance:{' '}
                <Text style={{color: theme.COLORS.blue, fontWeight: '600'}}>
                  {balance} GCoins
                </Text>
              </Text>
            </View>

            <Button
              label="Send"
              style={{marginTop: 'auto'}}
              onPress={handleTransferToken}
              loading={loading}
              // onPress={() => {
              //   handleTransferToken();
              //   // const verified = await AsyncStorage.getItem('verify');
              //   // if (verified !== 'true') {
              //   //   return navigation.navigate('Send-Verify');
              //   // }
              //   // navigation.navigate('Transaction-success');
              // }}
            />
          </ImageBackground>

          <View style={styles.hider}></View>
        </SafeAreaView>
      </ImageBackground>
      <VerifyPassword verify={verify} />
    </>
  );
};

export default SendEnterAmount;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 35,
    zIndex: 0,
    opacity: 0.25,
  },
  top: {
    paddingHorizontal: 24,
  },
  bottom: {
    flexGrow: 1,
    zIndex: 2,
    elevation: 2,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    marginTop: 27.5,
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.darkBlue,
    lineHeight: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    paddingRight: 40,
    paddingLeft: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.COLORS.blue,
    borderRadius: 16,
    marginBottom: 24,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  newAddressText: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#6E6E7E',
    flex: 1,
  },
  balance: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '400',
    marginTop: 8,
    marginLeft: 24,
    color: theme.COLORS.grey700,
  },
});
