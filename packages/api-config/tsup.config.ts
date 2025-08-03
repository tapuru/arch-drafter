import { baseTsupConfig } from '../../tsup.base';

export default baseTsupConfig({
  external: ['@nestjs/common', '@nestjs/config', '@nestjs/microservices', 'dotenv'],
});
