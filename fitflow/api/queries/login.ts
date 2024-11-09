import { Api } from '..';
import { FormDataType } from '@/features/Login/schema';

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
    return await Api.post<FormDataType, PostLoginResponse>('/login', body);
  },
};
