import z from 'zod';

export const BaseIdSchema = z.uuid('Id must be a valid uuid string');

export type BaseId = z.infer<typeof BaseIdSchema>;

export const parseBaseId = (data: unknown) => BaseIdSchema.parse(data);
export const isBaseId = (data: unknown): data is BaseId => BaseIdSchema.safeParse(data).success;
