import { GetUserByIdResponseDto, GetUserByIdRequestDto } from './dtos/get-user.dto';

export type UsersActions = {
  'users.get-by-id': {
    request: GetUserByIdRequestDto;
    response: GetUserByIdResponseDto;
  };
};
