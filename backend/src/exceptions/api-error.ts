export enum Status {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class ApiError extends Error {
  status: Status
  error: string

  constructor(status: Status, message: string) {
    super(message)
    this.status = status
    this.error = message
  }

  static BadRequest(message: string) {
    return new ApiError(Status.BAD_REQUEST, message)
  }

  static Unauthorized(message: string) {
    return new ApiError(Status.UNAUTHORIZED, message)
  }

  static Forbidden(message: string) {
    return new ApiError(Status.FORBIDDEN, message)
  }

  static NotFound(message: string) {
    return new ApiError(Status.NOT_FOUND, message)
  }

  static Internal(message: string) {
    return new ApiError(Status.INTERNAL_SERVER_ERROR, message)
  }
}
