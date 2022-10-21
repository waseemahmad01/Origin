import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../utils/RootNavigation';

const api = axios.create({
  baseURL: 'http://3.83.29.205:5001/',
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
      AsyncStorage.clear();
      navigate('Login');
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

// Buy voximplant number

export const getNumber = () => api.get('/v1/voxim/phone-number');

// Get SFTs packages

export const getSfts = () => api.get('/v1/sft/packages');

// Buy SFTs package

export const buySftsPackage = data => api.post('/v1/sft/package', data);

// Get active SFTs package

export const getActiveSftPackage = () => api.get('/v1/user/sft/package');

export const getAllChats = () => api.get('/v1/twilio/chats');

export const getAllSMS = receiver_number =>
  api.post(`/v1/twilio/messages`, {receiver_number});

export const sendMessage = data => api.post('/v1/voxim/send-sms', data);

// get available numbers

export const getAvailableNumbers = () => api.get('/v1/voxim/phone-number');

// buy a number

export const buyNumber = data => api.post('/v1/voxim/phone-number', data);

// get eth

export const getEth = () => api.get('/v1/account/tranfer/eth');

// Add call history

export const addCallHistory = data => api.post('/v1/voxim/call-history', data);

// add people

export const addPeople = data => api.post('/v1/contacts', data);

// get all people

export const allPeoples = data => api.get('/v1/contacts');

// get my contacts

export const getMyContacts = () => api.get('/v1/my-contacts');

// get Calls History

export const callHistory = () => api.get('/v1/voxim/call-history');

// get user call history

export const userCallHistory = number =>
  api.get(`/v1/voxim/call-history/${number}`);

// claim reward

export const claimReward = id =>
  api.post('/v1/account/claim-call-reward', {callId: id});

// verify password

export const verifyPassword = password =>
  api.post('/v1/auth/verify-by-password', {
    password,
  });

// updated user data

export const updateUser = data => api.patch('/v1/user/profile', data);

// update password

export const updatePassword = data =>
  api.patch('/v1/user/update-password', data);

// add profile

export const addProfile = data => api.put('/v1/user/profile', data);

// transaction History

export const transactionHistory = () =>
  api.get('/v1/account/etherscan/transactions');
