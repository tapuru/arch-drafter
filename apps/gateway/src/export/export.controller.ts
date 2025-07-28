import { Controller, Get, Inject } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(@Inject() private readonly exportService: ExportService) {}

  @Get('hello')
  async getHello() {
    return this.exportService.getHello();
  }
}
