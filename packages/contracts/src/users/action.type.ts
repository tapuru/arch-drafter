import { DeleteUserByIdRequestDto, DeleteUserByIdResponseDto } from '@/users/dtos/delete-user.dto';
import { UpdateUserRequestDto, UpdateUserResponseDto } from '@/users/dtos/update-user.dto';

import { GetUserByIdResponseDto, GetUserByIdRequestDto } from './dtos/get-user.dto';

export type UsersActions = {
  'users.get-by-id': {
    request: GetUserByIdRequestDto;
    response: GetUserByIdResponseDto;
  };
  'users.update-by-id': {
    request: UpdateUserRequestDto;
    response: UpdateUserResponseDto;
  };
  'users.delete-by-id': {
    request: DeleteUserByIdRequestDto;
    response: DeleteUserByIdResponseDto;
  };
};
