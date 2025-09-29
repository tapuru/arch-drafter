import {
  API_ROUTES,
  LoginRequestDto,
  LoginRequestSchema,
  LoginResponseDto,
  MeResponseDto,
  parseMeResponse,
  RegistrationRequestDto,
  RegistrationRequestSchema,
  RegistrationResponseDto,
  UpdateTokenResponseDto,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthServiceImpl } from '@/auth/auth.service';
import { COOKIES_SETTINGS } from '@/auth/constants/cookies-settings';
import { CookiesService } from '@/auth/cookies.service';
import { AuthorizedGuard } from '@/guards/authorized.guard';
import { UpdateTokenGuard } from '@/guards/update-token.guard';

@Controller(API_ROUTES.AUTH.ROOT)
export class AuthController {
  constructor(
    private readonly authService: AuthServiceImpl,
    private readonly cookiesService: CookiesService,
  ) {}

  @Post(API_ROUTES.AUTH.REGISTER)
  async register(
    @Body(new ZodValidationPipe(RegistrationRequestSchema)) data: RegistrationRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RegistrationResponseDto> {
    const { accessToken, refreshToken, refreshTokenTtl } = await this.authService.register(data);
    const cookie = this.cookiesService.getRefreshTokenCookie(refreshTokenTtl);
    res.cookie(COOKIES_SETTINGS.refreshToken.name, refreshToken, cookie);

    return { accessToken };
  }

  @Post(API_ROUTES.AUTH.LOGIN)
  async login(
    @Body(new ZodValidationPipe(LoginRequestSchema)) data: LoginRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const { accessToken, refreshToken, refreshTokenTtl } = await this.authService.login(data);
    const cookie = this.cookiesService.getRefreshTokenCookie(refreshTokenTtl);
    res.cookie(COOKIES_SETTINGS.refreshToken.name, refreshToken, cookie);

    return { accessToken };
  }

  @UseGuards(AuthorizedGuard)
  @Post(API_ROUTES.AUTH.LOGOUT)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req.tokenUuid);
    const cookie = this.cookiesService.getRefreshTokenCookie(0);
    res.cookie(COOKIES_SETTINGS.refreshToken.name, '', cookie);
  }

  @UseGuards(AuthorizedGuard)
  @Get(API_ROUTES.AUTH.ME)
  async me(@Req() req: Request): Promise<MeResponseDto> {
    return parseMeResponse(req.user);
  }

  @UseGuards(UpdateTokenGuard)
  @Post(API_ROUTES.AUTH.UPDATE_TOKEN)
  async updateToken(@Req() req: Request): Promise<UpdateTokenResponseDto> {
    return await this.authService.updateAccessToken(req.user.id, req.tokenUuid);
  }
}
