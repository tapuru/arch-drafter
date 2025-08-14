import z from 'zod';

export const SortDirectionSchema = z.enum(['ASC', 'DESC'], {
  message: 'Sort direction must be eather "ASC" or "DESC"',
});
export type SortDirection = z.infer<typeof SortDirectionSchema>;
export const parseSortDirection = (data: unknown) => SortDirectionSchema.parse(data);
export const isSortDirection = (data: unknown): data is SortDirection => SortDirectionSchema.safeParse(data).success;
