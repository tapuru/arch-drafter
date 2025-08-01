import { Transport } from '@nestjs/microservices';

import { ConfigData } from './config.type';

export const DEFAULT_CONFIG: ConfigData = {
  env: 'development',
  port: 3000,
  postgres: {
    url: process.env.POSTGRES_URL!,
  },
  services: {
    PROJECTS_SERVICE: {
      options: { host: '127.0.0.1', port: 3001 },
      transport: Transport.TCP,
    },
    SESSIONS_SERVICE: {
      options: { host: '127.0.0.1', port: 3002 },
      transport: Transport.TCP,
    },
    EXPORT_SERVICE: {
      options: { host: '127.0.0.1', port: 3003 },
      transport: Transport.TCP,
    },
    STORAGE_SERVICE: {
      options: { host: '127.0.0.1', port: 3004 },
      transport: Transport.TCP,
    },
  },
};
