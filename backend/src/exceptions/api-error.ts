import { ValidationError } from 'express-validator'

export enum Status {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class ApiError extends Error {
  status: Status
  errors?: Array<Error | ValidationError>

  constructor(
    status: Status,
    message?: string,
    errors?: Array<Error | ValidationError>
  ) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static BadRequest(
    message: string,
    errors: Array<Error | ValidationError> = []
  ) {
    return new ApiError(Status.BAD_REQUEST, message, errors)
  }

  static Unauthorized() {
    return new ApiError(Status.UNAUTHORIZED, 'Пользователь не авторизован')
  }

  static Forbidden(message: string) {
    return new ApiError(Status.FORBIDDEN, message)
  }

  static NotFound(message: string) {
    return new ApiError(Status.NOT_FOUND, message)
  }
}
