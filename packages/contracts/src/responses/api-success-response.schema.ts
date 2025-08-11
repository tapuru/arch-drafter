import z from 'zod';

export const ApiSuccessResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.literal(true),
    data: data,
  });
export type ApiSuccessResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof ApiSuccessResponseSchema<T>>>;

export const parseApiSuccessResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): ApiSuccessResponse<T> =>
    ApiSuccessResponseSchema(schema).parse(data);

export const isApiSuccessResponse =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): data is ApiSuccessResponse<T> =>
    ApiSuccessResponseSchema(schema).safeParse(data).success;
