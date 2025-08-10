import { tokens, users } from '@/config/schema';

export * from './modules/postgres.module';
export { ProjectsRepository } from '@/projects';
export { NodePgDatabase } from 'drizzle-orm/node-postgres';

export const userSchema = { users, tokens };
