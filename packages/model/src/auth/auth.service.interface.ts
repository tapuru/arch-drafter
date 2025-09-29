import { JwtToken, TokenUuid } from '@/tokens';
import { User, UserId } from '@/users';
import { Password } from '@/users/schemas/password.schema';

export type Register = (
  data: Pick<User, 'name' | 'email'> & { password: Password; passwordRepeat: Password },
) => Promise<{ accessToken: JwtToken }>;

export type Login = (data: Pick<User, 'email'> & { password: Password }) => Promise<{ accessToken: JwtToken }>;
export type Logout = (tokenUuid?: TokenUuid) => Promise<void>;
export type UpdateAccessToken = (userId?: UserId, tokenUuid?: TokenUuid) => Promise<{ accessToken: JwtToken }>;

export type AuthService = {
  login: Login;
  register: Register;
  logout: Logout;
  updateAccessToken: UpdateAccessToken;
};
