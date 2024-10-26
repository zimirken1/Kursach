import { Request, Response, NextFunction } from 'express'

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['123', '456'])
    } catch (e) {}
  }
}

export const userController = new UserController()
