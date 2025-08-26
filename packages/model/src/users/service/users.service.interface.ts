import { Password, User } from '@/users';

export type GetUserById = (id: User['id']) => Promise<User>;

export type UpdateUserById = (
  id: User['id'],
  data: Partial<Pick<User, 'name'> & { password: Password }>,
) => Promise<User>;

export type DeleteUserById = (id: User['id']) => Promise<void>;

export interface UserService {
  getUserById: GetUserById;
  updateUserById: UpdateUserById;
  deleteUserById: DeleteUserById;
}
