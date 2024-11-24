import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../exceptions/api-error';
import { tokenService } from 'src/service/token-service';
import { UserDto } from 'src/dto/user-dto';

type AuthMiddlewareRequest = Request & {
  user?: UserDto;
};

export const authMiddleware = (req: AuthMiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.Unauthorized());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.Unauthorized());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.Unauthorized());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.Unauthorized());
  }
};
