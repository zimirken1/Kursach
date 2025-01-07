import { Api } from '..';
import { Endpoints } from '../endpoints';
import { GetUserResponse } from './types';

export const UserApi = {
  async getUsers(): Promise<GetUserResponse[]> {
    const response = await Api.get(Endpoints.users.getUsers);
    return response.data;
  },
};
