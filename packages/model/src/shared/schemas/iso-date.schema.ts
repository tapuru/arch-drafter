import z from 'zod';

export const IsoDateSchema = z.iso.datetime();
export type IsoDate = z.infer<typeof IsoDateSchema>;

export const NullableIsoDateSchema = z.iso.datetime().nullable();
export type NullableIsoDate = z.infer<typeof NullableIsoDateSchema>;
