import { IsoDate, NullableIsoDate } from '@bc-arch-drafter/model';
import { customType } from 'drizzle-orm/pg-core';

export const ctIsoDate = customType<{ data: IsoDate }>({
  dataType: () => 'timestamptz',
  fromDriver: (val) => val as IsoDate,
});

export const ctNullableIsoDate = customType<{ data: NullableIsoDate }>({
  dataType: () => 'timestamptz',
  fromDriver: (val) => val as NullableIsoDate,
});
