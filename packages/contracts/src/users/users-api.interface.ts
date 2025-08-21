import { UsersActions } from '@/users';
import { MethodFromAction } from '@/utils';

export interface UsersApi {
  getUserById: MethodFromAction<'users.get-by-id', UsersActions>;
}
