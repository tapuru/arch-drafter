import z from 'zod';

export const IsoDateSchema = z.iso.datetime({ message: 'Invalid ISO datetime format' });
export type IsoDate = z.infer<typeof IsoDateSchema>;

export const NullableIsoDateSchema = z.iso.datetime({ message: 'Invalid ISO datetime format' }).nullable();
export type NullableIsoDate = z.infer<typeof NullableIsoDateSchema>;
