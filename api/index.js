import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/RootNavigation';

const api = axios.create({
  baseURL: 'https://696e-103-152-101-21.ap.ngrok.io',
  headers: {
    'Content-type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      navigate('Login');
      AsyncStorage.clear();
    }
    return Promise.reject(error);
  },
);

// get OTP

export const getOTP = number => api.get(`/v1/auth/get-otp/${number}`);

// Verify OTP

export const verifyOTP = data => api.post('/v1/auth/verify-otp', data);

// User SignUp

export const userSignUp = data => api.post('/v1/auth/signup', data);

// Login

export const userLogin = data => api.post('/v1/auth/login', data);

// Generate Wallet

export const generateWallet = () => api.get('/v1/account/generate-user-wallet');

// Get reward Tokens

export const rewardTokens = () => api.get('/v1/account/get-reward-tokens');

// Get wallet Balance

export const walletBalance = () => api.get('/v1/account/get-user-balance');

// Get user data with wallet

export const userData = () => api.get('/v1/user/profile');

// Get all users

export const allUsers = query =>
  api.get(`/v1/user/get-all-users${query ? `?${query}` : ''}`);

// Transfer Token

export const sendToken = data => api.post('/v1/account/transfer-tokens', data);

// Add Gcoins

export const addGcoins = data => api.post('/v1/account/add-gcoins', data);
