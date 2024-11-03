import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { User } from '@prisma/client'

import { RequestWithBody } from 'types/types'
import { UserUpdateModel, UserLoginModel } from './types'
import { userService } from '../../service/user-service'
import { ApiError } from 'src/exceptions/api-error'

class UserController {
  async registration(
    req: RequestWithBody<UserLoginModel>,
    res: Response<UserUpdateModel>,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }
      const { email, password } = req.body
      const userData = await userService.registration(email, password)
      UserController.setRefreshTokenCookie(res, userData.refreshToken)
      res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(
    req: RequestWithBody<UserLoginModel>,
    res: Response<UserUpdateModel>,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      UserController.setRefreshTokenCookie(res, userData.refreshToken)
      res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req: Request, res: Response<Promise<void>>, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const token = userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      res.json(token)
    } catch (error) {
      next(error)
    }
  }

  async refresh(
    req: Request,
    res: Response<UserUpdateModel>,
    next: NextFunction
  ) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      UserController.setRefreshTokenCookie(res, userData.refreshToken)
      res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req: Request, res: Response<User[]>, next: NextFunction) {
    try {
      const users = await userService.getAllUsers()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  static setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      httpOnly: true,
    })
  }
}

export const userController = new UserController()
