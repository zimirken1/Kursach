import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

import { prisma } from '../../server'
import { tokenService } from './token-service'
import { ApiError } from '../exceptions/api-error'
import UserDto from 'src/dto/user-dto'

class UserService {
  async registration(email: string, password: string) {
    const candidate = await prisma.user.findUnique({
      where: { email },
    })

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      )
    }

    const hashPassword = await bcrypt.hash(password, 3)
    const user = await prisma.user.create({
      data: { email, password: hashPassword },
    })

    return this.generateTokensForUser(user)
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user)
      throw ApiError.BadRequest(`Пользователь с таким ${email} не найден`)

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) throw ApiError.BadRequest('Неверный пароль')

    return this.generateTokensForUser(user)
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)

    if (!userData) {
      throw ApiError.Unauthorized()
    }

    const token = await tokenService.findToken(refreshToken)
    if (!token) {
      throw ApiError.Unauthorized()
    }

    const userId = typeof userData === 'string' ? userData : userData.id
    if (!userId) {
      throw ApiError.Unauthorized()
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw ApiError.Unauthorized()
    }

    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async generateTokensForUser(user: User) {
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async getAllUsers() {
    const users = await prisma.user.findMany()
    return users
  }
}

export const userService = new UserService()
