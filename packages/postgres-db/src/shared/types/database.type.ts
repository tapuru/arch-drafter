// type for schema used in repos
// put only tables adn their relations here

import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { invites, invitesRelations } from '@/invites';
import { memberships, membershipsRelations } from '@/memberships';
import { projects, projectsRelations } from '@/projects';
import { tokens, users, usersRelations } from '@/users';

const schema = {
  users,
  usersRelations,
  tokens,
  projects,
  projectsRelations,
  memberships,
  membershipsRelations,
  invites,
  invitesRelations,
};

export type Database = NodePgDatabase<typeof schema>;
