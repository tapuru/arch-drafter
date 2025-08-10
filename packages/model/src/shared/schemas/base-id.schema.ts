import z from 'zod';

export const BaseIdSchema = z.uuid('Id must be a valid uuid string');

export type BaseId = z.infer<typeof BaseIdSchema>;
