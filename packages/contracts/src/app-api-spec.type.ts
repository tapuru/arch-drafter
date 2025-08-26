import { AuthActions } from '@/auth';
import { InvitesApiSpec } from '@/invites';
import { UsersActions } from '@/users';

import { ProjectsActions } from './projects';

export type AppApiSpec = ProjectsActions & UsersActions & AuthActions & InvitesApiSpec;
