import Jwt from 'jsonwebtoken';

import { prisma } from '../../server';
import { UserDto } from '../dto/user-dto';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '';

class TokenService {
  async generateTokens(payload: UserDto) {
    const accessToken = Jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = Jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await prisma.token.findUnique({ where: { userId } });

    if (tokenData) {
      return await prisma.token.update({
        where: { userId },
        data: { refreshToken },
      });
    } else {
      return await prisma.token.create({
        data: {
          userId,
          refreshToken,
        },
      });
    }
  }

  async removeToken(refreshToken: string) {
    await prisma.token.delete({
      where: { refreshToken },
    });
  }

  async findToken(refreshToken: string) {
    const tokenData = await prisma.token.findUnique({
      where: { refreshToken },
    });
    return tokenData;
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = Jwt.verify(accessToken, JWT_ACCESS_SECRET) as UserDto;
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = Jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
