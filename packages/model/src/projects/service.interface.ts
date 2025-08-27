import { ServiceFromActions } from '@/shared';

import { PROJECTS_ACTIONS } from './actions.const';
import { Project, ProjectId } from './project.schema';

export type GetProjectById = (id: ProjectId) => Promise<Project>;

export type CreateProject = (data: Pick<Project, 'name' | 'ownerId'>) => Promise<Project>;

export type UpdateProject = (
  id: Project['id'],
  data: Partial<Pick<Project, 'name' | 'canvasJson' | 'ownerId'>>,
) => Promise<Project>;

export type DeleteProject = (id: ProjectId) => Promise<{ success: boolean }>;

export interface ProjectsService
  extends ServiceFromActions<
    typeof PROJECTS_ACTIONS,
    {
      [PROJECTS_ACTIONS.GET_BY_ID]: GetProjectById;
      [PROJECTS_ACTIONS.CREATE]: CreateProject;
      [PROJECTS_ACTIONS.UPDATE]: UpdateProject;
      [PROJECTS_ACTIONS.DELETE]: DeleteProject;
    }
  > {}
