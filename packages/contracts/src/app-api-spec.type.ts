import { AuthActions } from '@/auth';
import { InvitesApiSpec } from '@/invites';
import { MembershipsApiSpec } from '@/memberships';
import { ProjectsActions } from '@/projects';
import { UsersActions } from '@/users';

export type AppApiSpec = ProjectsActions & UsersActions & AuthActions & InvitesApiSpec & MembershipsApiSpec;
