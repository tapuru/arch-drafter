import { asc, desc } from 'drizzle-orm';

export const buildOrderBy = <TTable extends Record<string, any>, TColumn extends keyof TTable & string>(
  table: TTable,
  sortBy?: TColumn,
  //TODO: add enum
  direction?: 'DESC' | 'ASC',
) => {
  if (!sortBy || !table[sortBy]) return;
  return direction === 'DESC' ? desc(table[sortBy]) : asc(table[sortBy]);
};
