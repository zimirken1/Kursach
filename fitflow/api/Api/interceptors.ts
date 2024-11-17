import * as SecureStore from 'expo-secure-store';

import { HTTPStatuses } from '@/api/types';
import { TOKEN } from '@/context/AuthContext';

import { Api } from '.';
import { AuthApi } from './authApi/authApi';

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
    if (error.response.status == HTTPStatuses.Unauthorized) {
      try {
        const { accessToken } = await AuthApi.getRefresh();
        Api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await SecureStore.setItemAsync(TOKEN, accessToken);
        return Api.request(originalRequest);
      } catch {
        console.log('Пльзователь не авторизован');
      }
    }
  }
);
