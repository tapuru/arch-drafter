import {
  UsersApi,
  GetUserByIdRequestSchema,
  GetUserByIdRequestDto,
  GetUserByIdResponseDto,
  UpdateUserRequestSchema,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  parseUpdateUser,
  parseGetUserByIdResponse,
} from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

import { UsersServiceImpl } from '@/users/users.service';

@Controller()
export class UsersController implements UsersApi {
  constructor(private readonly usersService: UsersServiceImpl) {}

  @UsePipes(new ZodValidationPipe(GetUserByIdRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'users.get-by-id' })
  async getUserById(@Payload() { id }: GetUserByIdRequestDto): Promise<GetUserByIdResponseDto> {
    const user = await this.usersService.getUserById(id);
    return parseGetUserByIdResponse(user);
  }

  @UsePipes(new ZodValidationPipe(UpdateUserRequestSchema), (payload) => new RpcException(payload))
  @MessagePattern({ cmd: 'users.update-by-id' })
  async updateUserById(@Payload() payload: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
    const user = await this.usersService.updateUserById(payload.id, payload.data);
    return parseUpdateUser(user);
  }

  @MessagePattern({ cmd: 'users.delete-by-id' }, (payload) => new RpcException(payload))
  async deleteUserById({ id }: any) {
    await this.usersService.deleteUserById(id);

    // todo response after delete
    return { message: 'success' };
  }
}
