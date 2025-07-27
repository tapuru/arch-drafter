import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  async Me() {
    return 'Hello World!';
  }
}
