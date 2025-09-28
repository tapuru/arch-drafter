import { LogoutRequestDto } from '@/auth/dtos/logout.dto';
import { MeResponseDto } from '@/auth/dtos/me-response.dto';
import { UpdateTokenResponseDto } from '@/auth/dtos/update-token-response.dto';
import { UpdateTokenRequestDto } from '@/auth/dtos/update-token.dto';

import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RegistrationRequestDto, RegistrationResponseDto } from './dtos/registration.dto';

export type AuthActions = {
  'auth.register': {
    request: RegistrationRequestDto;
    response: RegistrationResponseDto;
  };
  'auth.login': {
    request: LoginRequestDto;
    response: LoginResponseDto;
  };
  'auth.me': {
    request: '';
    response: MeResponseDto;
  };
  'auth.logout': {
    request: LogoutRequestDto;
    response: void;
  };
  'auth.update-token': {
    request: UpdateTokenRequestDto;
    response: UpdateTokenResponseDto | undefined;
  };
};
