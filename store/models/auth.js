import {createModel} from '@rematch/core';
import {getOTP, userData, userLogin, userSignUp, verifyOTP} from '../../api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth = createModel()({
  name: 'auth',
  state: {
    loading: false,
    phone_number: '',
    otpVerified: false,
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    user: null,
    loggedIn: false,
  },
  reducers: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setPhoneNumber(state, payload) {
      state.phone_number = payload;
    },
    setOtpVerified(state, payload) {
      state.otpVerified = payload;
    },
    setFirstname(state, payload) {
      state.firstname = payload;
    },
    setLastname(state, payload) {
      state.lastname = payload;
    },
    setUsername(state, payload) {
      state.username = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoggedIn(state, payload) {
      state.loggedIn = payload;
    },
  },
  effects: dispatch => ({
    async generateOTP({number, handleContinue}) {
      try {
        dispatch.auth.setLoading(true);
        dispatch.auth.setPhoneNumber(number);
        await getOTP(number);
        handleContinue();
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
    async verifyOtp({otp, handleContinue, setError}, state) {
      try {
        dispatch.auth.setLoading(true);
        const res = await verifyOTP({
          otp_code: otp,
          phone_number: state.auth.phone_number,
        });
        console.log(res.data);
        if (res.status === 200) {
          handleContinue();
        } else {
          setError('Invalid OTP code');
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
    async signUp({passwords, navigation}, state) {
      try {
        dispatch.auth.setLoading(true);
        const {phone_number, email, username, firstname, lastname} = state.auth;

        const apiData = {
          phone_number,
          email,
          username,
          name: `${firstname} ${lastname}`,
          ...passwords,
        };

        const {data} = await userSignUp(apiData);
        console.log(data);
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
    async login({formData, navigation}) {
      try {
        dispatch.auth.setLoading(true);
        const {data} = await userLogin(formData);
        const {accessToken, ...user} = data;
        dispatch.auth.setUser(user);
        await AsyncStorage.setItem('token', accessToken);
        dispatch.wallet.setPublicAddress(user.origen_public_wallet_address);
        dispatch.auth.setLoggedIn(true);
        navigation.reset({
          index: 0,
          routes: [{name: 'Wallet'}],
        });
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
    async getUserData() {
      try {
        dispatch.auth.setLoading(true);
        const {data} = await userData();
        console.log('userData ===>', data);
        dispatch.auth.setUser(data);
        dispatch.wallet.setPublicAddress(data?.origen_public_wallet_address);
        console.log('wallet ===>', data?.origen_public_wallet_address);
      } catch (err) {
        console.log(err.message);
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
  }),
});
