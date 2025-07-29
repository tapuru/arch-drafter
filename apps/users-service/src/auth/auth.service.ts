import { LoginDto, RegisterDto } from '@bc-arch-drafter/db';
import { Injectable } from '@nestjs/common';

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
