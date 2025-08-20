import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { resolve } from 'node:path';

const NODE_ENV = process.env.NODE_ENV || 'development';

config({ path: resolve(process.cwd(), `../../.env.${NODE_ENV}`) });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: false,
  },
});
