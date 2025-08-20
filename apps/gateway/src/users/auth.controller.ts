import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  RegistrationRequestSchema,
  RegistrationRequestDto,
  RegistrationResponseDto,
  LoginRequestSchema,
  LoginRequestDto,
  LoginResponseDto,
  GetUserByIdResponseDto,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe, sendMessage } from '@bc-arch-drafter/lib';
import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Controller(API_ROUTES.AUTH.ROOT)
export class AuthController {
  constructor(@Inject(Microservice.USERS) private readonly client: ClientProxy) {}

  @Post(API_ROUTES.AUTH.REGISTER)
  async register(
    @Body(new ZodValidationPipe(RegistrationRequestSchema)) data: RegistrationRequestDto,
  ): Promise<RegistrationResponseDto> {
    return await sendMessage({
      client: this.client,
      pattern: { cmd: 'auth.register' },
      payload: data,
    });
  }

  @Post(API_ROUTES.AUTH.LOGIN)
  async login(@Body(new ZodValidationPipe(LoginRequestSchema)) data: LoginRequestDto): Promise<LoginResponseDto> {
    return await sendMessage({
      client: this.client,
      pattern: { cmd: 'auth.login' },
      payload: data,
    });
  }

  @Get(API_ROUTES.AUTH.ME)
  async me(@Req() req: Request): Promise<GetUserByIdResponseDto> {
    return {} as any;
  }
}
