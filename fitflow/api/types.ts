import { AxiosError } from 'axios';

export enum HTTPStatuses {
  'Unauthorized' = 401,
}

type ApiErrorResponse = {
  status: number;
  message: string;
  errors: Array<unknown>;
};

export type ApiError = AxiosError<ApiErrorResponse>;
