import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const user = await this.usersService.create(dto);
    return this.buildAuthResponse(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user.id, user.email, user.role);
  }

  private async generateTokens(userId: string, email: string, role: UserRole) {
    const access = await this.jwt.signAsync(
      { sub: userId, email, role },
      {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      },
    );

    const refresh = await this.jwt.signAsync(
      { sub: userId, email, role },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    return { accessToken: access, refreshToken: refresh, tokenType: 'Bearer' as const };
  }

  private async buildAuthResponse(userId: string, email: string, role: UserRole) {
    const tokens = await this.generateTokens(userId, email, role);
    return {
      user: {
        id: userId,
        email,
        role,
      },
      ...tokens,
    };
  }
}
