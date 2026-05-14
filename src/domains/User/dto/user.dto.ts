import { UserRole } from "../entities/user.entity"

export interface UserCreateDto {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface UserLoginDto {
  email: string
  password: string
}

export interface UserOutDto {
  publicId: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export interface LoginResponseDto {
  accessToken: string
  tokenType: string
  user: UserOutDto
}