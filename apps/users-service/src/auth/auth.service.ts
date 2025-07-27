import { Injectable } from '@nestjs/common';

import { LoginDto, RegisterDto } from './dto/dto';

@Injectable()
export class AuthService {
  register(dto: RegisterDto): string {
    const { email, password } = dto;
    return `email: ${email} password:${password}`;
  }

  login(dto: LoginDto): string {
    const { email, password } = dto;
    return `email: ${email} password:${password}`;
  }
}
