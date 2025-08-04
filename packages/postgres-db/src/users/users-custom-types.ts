import { UserId } from '@bc-arch-drafter/model';
import { customType } from 'drizzle-orm/pg-core';

export const ctUserId = customType<{ data: UserId }>({
  dataType: () => 'uuid',
  fromDriver: (val) => val as UserId,
});
