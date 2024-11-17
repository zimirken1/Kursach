import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { LoginApi } from '@/api/queries/login';
import { TOKEN } from '@/context/AuthContext';

export const Api = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

Api.interceptors.request.use(request => {
  request.headers!.Authorization = `Bearer ${SecureStore.getItem(TOKEN)}`;
  return request;
});

Api.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status == 401) {
      try {
        const { accessToken } = await LoginApi.getRefresh();
        Api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await SecureStore.setItemAsync(TOKEN, accessToken);
        return Api.request(originalRequest);
      } catch {
        console.log('Пльзователь не авторизован');
      }
    }
  }
);
