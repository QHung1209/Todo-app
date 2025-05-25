import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const ms = require('ms');
import { Response } from 'express';
import { User } from 'src/users/entities/user.schema';
import { IUser } from 'src/users/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user)
      if (this.userService.checkUserPassword(password, user.password))
        return user;
    return null;
  }

  createToken(payload: any, type: any, expiredTime: any) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>(type),
      expiresIn: ms(this.configService.get<string>(expiredTime)) / 1000,
    });
    return token;
  }

  async login(user: IUser, response: Response) {
    if (user == null)
      throw new UnauthorizedException('Check your email or password again.');
    const payload = {
      email: user.email,
      name: user.name,
      _id: user._id,
    };

    const accessToken = this.createToken(
      payload,
      'JWT_SECRET',
      'EXPIRES_IN',
    );
    return {
      accessToken,
      user: payload,
    };
  }

  async register(createUserDTO: CreateUserDto) {
    const user = await this.userService.create(createUserDTO);
    return {
      _id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
