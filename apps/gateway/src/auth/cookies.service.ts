import { Injectable } from '@nestjs/common';

import { COOKIES_SETTINGS } from '@/auth/constants/cookies-settings';

@Injectable()
export class CookiesService {
  public getRefreshTokenCookie(cookieAge: number) {
    return {
      httpOnly: COOKIES_SETTINGS.refreshToken.httpOnly,
      secure: COOKIES_SETTINGS.refreshToken.secure,
      maxAge: cookieAge,
      path: COOKIES_SETTINGS.refreshToken.path,
      sameSite: COOKIES_SETTINGS.refreshToken.sameSite,
    };
  }
}
