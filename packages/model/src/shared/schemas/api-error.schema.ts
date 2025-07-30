import z from "zod";

export const ApiErrorSchema = z.object({
  field: z.string().nullable(),
  message: z.string(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;
