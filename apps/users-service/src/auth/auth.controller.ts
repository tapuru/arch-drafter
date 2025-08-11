import { LoginRequestDto, RegistrationRequestDto } from '@bc-arch-drafter/model';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegistrationRequestDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  async Me() {
    return this.authService.me();
  }
}
