import { Controller, Get, Inject } from '@nestjs/common';
import { SesisonsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(@Inject() private readonly sessionsService: SesisonsService) {}

  @Get('hello')
  async getHello() {
    return this.sessionsService.getHello();
  }
}
