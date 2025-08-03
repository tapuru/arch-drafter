import z from 'zod';

export const JwtTokenSchema = z.jwt();
export type JwtToken = z.infer<typeof JwtTokenSchema>;
