import axios from 'axios';
import {API_URL} from '@env';

const api = axios.create({
  baseURL: 'https://9da6-103-152-101-21.ap.ngrok.io',
  headers: {
    'Content-type': 'application/json',
  },
});

// get OTP

export const getOTP = number => api.get(`/v1/auth/get-otp/${number}`);

// Verify OTP

export const verifyOTP = data => api.post('/v1/auth/verify-otp', data);

// User SignUp

export const userSignUp = data => api.post('/v1/auth/signup', data);

// Login

export const userLogin = data => api.post('/v1/auth/login', data);
