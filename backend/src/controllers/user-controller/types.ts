import UserDto from 'src/dto/user-dto'

export type UserUpdateModel = {
  user: UserDto
  accessToken: string
  refreshToken: string
}

export type UserLoginModel = {
  email: string
  password: string
}
