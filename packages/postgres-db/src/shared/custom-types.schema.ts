import { IsoDate, NullableIsoDate } from '@bc-arch-drafter/model';
import { customType } from 'drizzle-orm/pg-core';

export const ctIsoDate = customType<{ data: IsoDate; driverData: string }>({
  dataType: () => 'timestamptz',
  fromDriver: (val) => new Date(val).toISOString() as IsoDate,
});

export const ctNullableIsoDate = customType<{ data: NullableIsoDate; driverData: string }>({
  dataType: () => 'timestamptz',
  fromDriver: (val) => new Date(val).toISOString() as NullableIsoDate,
});
