import { Request, Response } from 'express'

import { ApiError } from '../exceptions/api-error'
import { Status } from '../exceptions/api-error'

export const errorMiddleware = (error: Error, req: Request, res: Response) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    })
  }

  console.error(error)

  return res.status(Status.INTERNAL_SERVER_ERROR).json({
    status: Status.INTERNAL_SERVER_ERROR,
    message: 'Внутренняя ошибка сервера',
  })
}
