import { Controller, Get, Inject } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(@Inject() private readonly storageService: StorageService) {}

  @Get('hello')
  async getHello() {
    return this.storageService.getHello();
  }
}
