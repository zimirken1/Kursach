import { AxiosResponse } from 'axios';
import { FormDataType } from '@/features/Login/schema';
import { Api } from '.';

type PostLoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
};

export const LoginApi = {
  async postLogin(body: FormDataType): Promise<PostLoginResponse> {
    const { data } = await Api.post<PostLoginResponse, AxiosResponse<PostLoginResponse>, FormDataType>(
      `${process.env.EXPO_PUBLIC_API_URL}/login`,
      body
    );

    return data;
  },

  async postLogout(): Promise<PostLoginResponse> {
    return await Api.post(`${process.env.EXPO_PUBLIC_API_URL}/logout`);
  },
};
