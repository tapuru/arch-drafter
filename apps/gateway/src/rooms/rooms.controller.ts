import { Microservice } from '@bc-arch-drafter/api-config';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller(Microservice.ROOMS)
export class RoomsController {
  constructor(@Inject(Microservice.ROOMS) private readonly client: ClientProxy) {}

  @Get('hello')
  async getHello(): Promise<{ message: string }> {
    return lastValueFrom(this.client.send<{ message: string }, {}>({ cmd: 'get-hello' }, {}));
  }
}
