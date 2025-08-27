import { AuthActions } from '@/auth';
import { InvitesApiSpec } from '@/invites';
import { MembershipsApiSpec } from '@/memberships';
import { ProjectsApiSpec } from '@/projects';
import { UsersActions } from '@/users';

export type AppApiSpec = ProjectsApiSpec & UsersActions & AuthActions & InvitesApiSpec & MembershipsApiSpec;
