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
    response: '';
  };
};
