import { MethodFromAction } from '@/utils';

import { ProjectsActions } from './actions.type';

export interface ProjectsApi {
  createProject: MethodFromAction<'projects.create', ProjectsActions>;
  getProjectById: MethodFromAction<'projects.get-by-id', ProjectsActions>;
  updateProject: MethodFromAction<'projects.update', ProjectsActions>;
  deleteProject: MethodFromAction<'projects.delete', ProjectsActions>;
}
