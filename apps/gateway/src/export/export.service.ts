import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExportService {
  constructor(@Inject('EXPORT_SERVICE') private readonly client: ClientProxy) {}

  async getHello(): Promise<{ message: string }> {
    return lastValueFrom(
      this.client.send<{ message: string }, {}>({ cmd: 'get-hello' }, {}),
    );
  }
}
