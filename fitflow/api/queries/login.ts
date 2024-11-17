import { AxiosResponse } from 'axios';

import { FormDataType } from '@/features/Login/schema';

import { Api } from '.';

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
};

export const LoginApi = {
  async postLogin(body: FormDataType): Promise<AuthResponse> {
    const { data } = await Api.post<AuthResponse, AxiosResponse<AuthResponse>, FormDataType>(
      `${process.env.EXPO_PUBLIC_API_URL}/login`,
      body
    );
    return data;
  },

  async postLogout(): Promise<void> {
    const response = await Api.post(`${process.env.EXPO_PUBLIC_API_URL}/logout`);
    return response.data;
  },

  async getRefresh(): Promise<AuthResponse> {
    const response = await Api.get(`${process.env.EXPO_PUBLIC_API_URL}/refresh`);
    return response.data;
  },

  async getUsers(): Promise<{ email: string; password: string; id: string }[]> {
    const response = await Api.get(`${process.env.EXPO_PUBLIC_API_URL}/users`);
    return response.data;
  },
};
