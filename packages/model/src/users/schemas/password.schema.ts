import z from 'zod';

export const PasswordSchema = z
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, 'Password is invalid');

export type Password = z.infer<typeof PasswordSchema>;

export const parsePassword = (data: unknown) => PasswordSchema.parse(data);
export const isPassword = (data: unknown): data is Password => PasswordSchema.safeParse(data).success;
