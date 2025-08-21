import { JwtToken, User } from '@/users';
import { Password } from '@/users/schemas/password.schema';

export type Register = (
  data: Pick<User, 'name' | 'email'> & { password: Password },
) => Promise<{ accessToken: JwtToken }>;

export type Login = (data: Pick<User, 'email'> & { password: Password }) => Promise<{ accessToken: JwtToken }>;

export interface AuthService {
  login: Login;
  register: Register;
}
