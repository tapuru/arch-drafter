import { UsersApi, GetUserByIdRequestSchema, GetUserByIdRequestDto } from '@bc-arch-drafter/contracts';
import { ZodValidationPipe } from '@bc-arch-drafter/lib';
import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

import { UsersServiceImpl } from '@/users/users.service';

@Controller()
export class UsersController implements UsersApi {
  constructor(private readonly usersService: UsersServiceImpl) {}

  @UsePipes(new ZodValidationPipe(GetUserByIdRequestSchema, (payload) => new RpcException(payload)))
  @MessagePattern({ cmd: 'users.get-by-id' })
  async getUserById({ id }: GetUserByIdRequestDto) {
    return await this.usersService.getUserById(id);
  }
}
