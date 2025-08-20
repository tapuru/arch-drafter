import { Microservice } from '@bc-arch-drafter/api-config';
import { API_ROUTES, GetUserByIdResponseDto } from '@bc-arch-drafter/contracts';
import { sendMessage } from '@bc-arch-drafter/lib';
import { parseUserId } from '@bc-arch-drafter/model';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller(API_ROUTES.USERS)
export class UsersController {
  constructor(@Inject(Microservice.USERS) private readonly client: ClientProxy) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserByIdResponseDto> {
    return await sendMessage({
      client: this.client,
      pattern: { cmd: 'users.get-by-id' },
      payload: { id: parseUserId(id) },
    });
  }
}
