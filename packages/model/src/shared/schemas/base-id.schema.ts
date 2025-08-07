import z from 'zod';

export const BaseIdSchema = z.uuid();

export type BaseId = z.infer<typeof BaseIdSchema>;
