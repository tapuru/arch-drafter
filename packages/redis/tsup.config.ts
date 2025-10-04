import { baseTsupConfig } from '../../tsup.base';

export default baseTsupConfig({
  external: ['pg', 'drizzle-orm', '@bc-arch-drafter/api-config', '@bc-arch-drafter/model', '@nestjs/common'],
});
