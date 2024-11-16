import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { TOKEN } from '@/context/AuthContext';

export const Api = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

Api.interceptors.request.use(request => {
  request.headers!.Authorization = `Bearer ${SecureStore.getItem(TOKEN)}`;
  return request;
});
