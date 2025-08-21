import { AuthActions } from '@/auth';
import { UsersActions } from '@/users';

import { ProjectsActions } from './projects';

export type AppActions = ProjectsActions & UsersActions & AuthActions;
