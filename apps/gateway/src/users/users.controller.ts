import { Microservice } from '@bc-arch-drafter/api-config';
import {
  API_ROUTES,
  GetUserByIdResponseDto,
  UpdateUserRequestSchema,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
} from '@bc-arch-drafter/contracts';
import { sendMessage, ZodValidationPipe } from '@bc-arch-drafter/lib';
import { parseUserId } from '@bc-arch-drafter/model';
import { Body, Controller, Delete, Get, Inject, Param, Patch } from '@nestjs/common';
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

  @Patch('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateUserRequestSchema.shape.data)) data: UpdateUserRequestDto['data'],
  ): Promise<UpdateUserResponseDto> {
    return await sendMessage({
      client: this.client,
      pattern: { cmd: 'users.update-by-id' },
      payload: { id: parseUserId(id), data },
    });
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: string) {
    return await sendMessage({
      client: this.client,
      pattern: { cmd: 'users.delete-by-id' },
      payload: { id: parseUserId(id) },
    });
  }
}
