import { AuthActions } from '@/auth';
import { MethodFromAction } from '@/utils';

export interface AuthApi {
  registerUser: MethodFromAction<'auth.register', AuthActions>;
  login: MethodFromAction<'auth.login', AuthActions>;
  me: MethodFromAction<'auth.me', AuthActions>;
  logout: MethodFromAction<'auth.logout', AuthActions>;
  updateToken: MethodFromAction<'auth.update-token', AuthActions>;
}
