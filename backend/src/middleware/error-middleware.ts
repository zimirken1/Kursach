import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../exceptions/api-error'
import { Status } from '../exceptions/api-error'

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      errors: error.errors,
    })
  }

  console.log(error)

  return res.status(Status.INTERNAL_SERVER_ERROR).json({
    status: Status.INTERNAL_SERVER_ERROR,
    message: 'Внутренняя ошибка сервера',
  })
}
