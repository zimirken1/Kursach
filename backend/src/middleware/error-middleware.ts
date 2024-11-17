import { ErrorRequestHandler } from 'express';
import { ApiError, Status } from '../exceptions/api-error';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ApiError) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      errors: error.errors || null,
    });
    return;
  }

  console.error('Ошибка:', error);

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    status: Status.INTERNAL_SERVER_ERROR,
    message: 'Внутренняя ошибка сервера',
  });
};
