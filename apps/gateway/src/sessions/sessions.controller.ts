import { Controller, Get, Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('sessions')
export class SessionsController {
  constructor(
    @Inject('SESSIONS_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('hello')
  async getHello(): Promise<{ message: string }> {
    return lastValueFrom(
      this.client.send<{ message: string }, {}>({ cmd: 'get-hello' }, {}),
    );
  }
}
