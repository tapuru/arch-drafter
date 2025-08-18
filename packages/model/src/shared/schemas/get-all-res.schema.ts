import z from 'zod';

export const GetAllResSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    totalCount: z.number(),
    items: z.array(data),
  });

export type GetAllRes<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof GetAllResSchema<T>>>;

export const parseGetAllRes =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown) =>
    GetAllResSchema(schema).parse(data);

export const isGetAllRes =
  <T extends z.ZodTypeAny>(schema: T) =>
  (data: unknown): data is GetAllRes<T> =>
    GetAllResSchema(schema).safeParse(data).success;
