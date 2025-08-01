import { Module } from '@nestjs/common';

import { ConfigService } from '@/config.service';
import { DEFAULT_CONFIG } from '@/lib/default-config.const';

const configFactory = {
  provide: ConfigService,
  useFactory: () => {
    const config = new ConfigService(DEFAULT_CONFIG);
    config.loadFromEnv();
    return config;
  },
};

@Module({
  imports: [],
  controllers: [],
  providers: [configFactory],
  exports: [configFactory],
})
export class ConfigModule {}
