import { baseTsupConfig } from '../../tsup.base';

export default baseTsupConfig({
  external: ['zod', '@nestjs/microservices', '@nestjs/common', 'rxjs'],
});
