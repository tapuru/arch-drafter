import { ProjectsApi, API_ROUTES, parseProjectResponse, parseSuccessTrueResponse } from '@bc-arch-drafter/contracts';

import { api } from '@/api';

class ProjectsApiImpl implements ProjectsApi {
  async createProject(data: Parameters<ProjectsApi['createProject']>[0]) {
    const res = await api.post(API_ROUTES.PROJECTS.ROOT, data);
    return parseProjectResponse(res.data);
  }

  async getProjectById({ id }: Parameters<ProjectsApi['getProjectById']>[0]) {
    const res = await api.get(API_ROUTES.PROJECTS.GET_BY_ID(id));
    return parseProjectResponse(res.data);
  }

  async deleteProject({ id }: Parameters<ProjectsApi['deleteProject']>[0]) {
    const res = await api.delete(API_ROUTES.PROJECTS.DELETE(id));
    return parseSuccessTrueResponse(res.data);
  }

  async updateProject({ id, data }: Parameters<ProjectsApi['updateProject']>[0]) {
    const res = await api.put(API_ROUTES.PROJECTS.UPDATE(id), data);
    return parseProjectResponse(res.data);
  }
}

export const projectsApi = new ProjectsApiImpl();
