import { UsersActions } from '@/users';
import { MethodFromAction } from '@/utils';

export interface UsersApi {
  getUserById: MethodFromAction<'users.get-by-id', UsersActions>;
  updateUserById: MethodFromAction<'users.update-by-id', UsersActions>;
  deleteUserById: MethodFromAction<'users.delete-by-id', UsersActions>;
}
