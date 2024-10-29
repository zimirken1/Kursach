import bcrypt from 'bcrypt'

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

    const userDto = new UserDto(user)

    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }
}

export const userService = new UserService()
