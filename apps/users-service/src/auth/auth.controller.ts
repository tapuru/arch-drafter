import {
  RegistrationRequestSchema,
  RegistrationRequestDto,
  LoginRequestSchema,
  LoginRequestDto,
  AuthApi,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { AuthServiceImpl } from './auth.service';

@Controller('auth')
export class AuthController implements AuthApi {
  constructor(private readonly authService: AuthServiceImpl) {}

  @UsePipes(new ZodValidationPipe(RegistrationRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'auth.register' })
  async registerUser(@Payload() data: RegistrationRequestDto) {
    return await this.authService.register(data);
  }

  @UsePipes(new ZodValidationPipe(LoginRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() data: LoginRequestDto) {
    return await this.authService.login(data);
  }

  @UsePipes(new ZodValidationPipe(LoginRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'auth.me' })
  async me(@Payload() data: any) {
    // return await this.authService.me(data);
    return '' as const;
  }
}
