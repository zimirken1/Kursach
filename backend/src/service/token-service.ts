import Jwt from 'jsonwebtoken'

import { prisma } from 'server'
import UserDto from 'src/dto/user-dto'

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
    const tokenData = await prisma.token.findFirst({ where: { userId } })

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
}

export const tokenService = new TokenService()
