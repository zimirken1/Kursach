import Jwt from 'jsonwebtoken'
import { Token } from '@prisma/client'

import { prisma } from '../../server'
import UserDto from '../dto/user-dto'

class TokenService {
  async generateTokens(payload: UserDto) {
    const accessToken = Jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '30m',
      }
    )
    const refreshToken = Jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '30d',
      }
    )
    return { accessToken, refreshToken }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await prisma.token.findUnique({ where: { userId } })

    if (tokenData) {
      return await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      })
    } else {
      return await prisma.token.create({
        data: {
          userId,
          refreshToken,
        },
      })
    }
  }

  async removeToken(refreshToken: string) {
    const tokenData = await prisma.token.delete({
      where: { refreshToken },
    })
    return tokenData
  }
}

export const tokenService = new TokenService()
