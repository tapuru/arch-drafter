import z from 'zod';

export const AppIdSchema = z.uuid();

export type AppId = z.infer<typeof AppIdSchema>;
