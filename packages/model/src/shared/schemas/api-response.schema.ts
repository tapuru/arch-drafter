import z from "zod";
import { ApiErrorSchema } from "./api-error.schema";

export const ApiResponseSchema = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.boolean(),
    data: data.optional(),
    errors: z.array(ApiErrorSchema).optional(),
  });

export type ApiResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof ApiResponseSchema<T>>
>;
