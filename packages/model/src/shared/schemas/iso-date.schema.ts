import z from 'zod';

export const IsoDateSchema = z.iso.datetime({ message: 'Invalid ISO datetime format' });
export type IsoDate = z.infer<typeof IsoDateSchema>;

export const parseIsoDate = (data: unknown) => IsoDateSchema.parse(data);
export const isIsoDate = (data: unknown): data is IsoDate => IsoDateSchema.safeParse(data).success;

export const NullableIsoDateSchema = z.iso.datetime({ message: 'Invalid ISO datetime format' }).nullable();
export type NullableIsoDate = z.infer<typeof NullableIsoDateSchema>;

export const parseNullableIsoDate = (data: unknown) => NullableIsoDateSchema.parse(data);
export const isNullableIsoDate = (data: unknown): data is NullableIsoDate =>
  NullableIsoDateSchema.safeParse(data).success;
