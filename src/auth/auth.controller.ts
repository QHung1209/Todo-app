import {
  Controller,
  Request,
  Post,
  UseGuards,
  Res,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/guard.decorator';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('user-info')
  async getUserInfo(@Request() req: any) {
    return {
      user: req.user,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
