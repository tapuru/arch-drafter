import { SortDirection } from '@bc-arch-drafter/model';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export type FindManyOptions<
  TTable extends PgTableWithColumns<{ columns: any; dialect: any; name: any; schema: any }>,
  TOptions extends {
    filters?: Record<string, any>;
    sortBy?: keyof TTable;
    relations?: Record<string, any>;
  },
> = {
  relations?: TOptions['relations'];
  filters?: TOptions['filters'];
  sortDirection?: SortDirection;
  sortBy?: TOptions['sortBy'];
  page?: number;
  pageSize?: number;
};
