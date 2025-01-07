import { AxiosError } from 'axios'

export enum HTTPStatuses {
  'Unauthorized' = 401,
}

export type ResponseParams = Record<string, string | number | undefined>

type ApiErrorResponse = {
  status: number
  message: string
  errors: unknown[]
}

export type ApiError = AxiosError<ApiErrorResponse>
