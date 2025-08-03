import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('export')
export class ExportController {
  constructor(@Inject('EXPORT_SERVICE') private readonly client: ClientProxy) {}

  @Get('hello')
  async getHello(): Promise<{ message: string }> {
    return lastValueFrom(this.client.send<{ message: string }, {}>({ cmd: 'get-hello' }, {}));
  }
}
