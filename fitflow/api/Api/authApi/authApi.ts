import { AxiosResponse } from 'axios';

import { FormDataType } from '@/screens/Login/schema';

import { Api } from '..';
import { Endpoints } from '../endpoints';
import { AuthResponse } from './types';

export const AuthApi = {
  async postLogin(body: FormDataType): Promise<AuthResponse> {
    const { data } = await Api.post<AuthResponse, AxiosResponse<AuthResponse>, FormDataType>(
      Endpoints.auth.login,
      body
    );
    return data;
  },

  async postLogout(): Promise<void> {
    const response = await Api.post(Endpoints.auth.logout);
    return response.data;
  },

  async getRefresh(): Promise<AuthResponse> {
    const response = await Api.get(Endpoints.auth.refresh);
    return response.data;
  },
};
