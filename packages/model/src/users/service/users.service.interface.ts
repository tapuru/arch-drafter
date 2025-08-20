import { User } from '@/users';

export type GetUserById = (id: User['id']) => Promise<User>;

export interface UserService {
  getUserById: GetUserById;
}
