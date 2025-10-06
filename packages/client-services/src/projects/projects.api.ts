import {
  ProjectsApi,
  API_ROUTES,
  parseProjectResponse,
  parseSuccessTrueResponse,
  parseCanvasResponse,
} from '@bc-arch-drafter/contracts';

import { createApi } from '@/api';

export class ProjectsApiImpl implements ProjectsApi {
  private api;

  constructor(baseUrl: string) {
    this.api = createApi(baseUrl);
  }

  async createProject(data: Parameters<ProjectsApi['createProject']>[0]) {
    const res = await this.api.post(API_ROUTES.PROJECTS.ROOT, data);
    return parseProjectResponse(res.data);
  }

  async getProjectById({ id }: Parameters<ProjectsApi['getProjectById']>[0]) {
    const res = await this.api.get(API_ROUTES.PROJECTS.GET_BY_ID(id));
    return parseProjectResponse(res.data);
  }

  async deleteProject({ id }: Parameters<ProjectsApi['deleteProject']>[0]) {
    const res = await this.api.delete(API_ROUTES.PROJECTS.DELETE(id));
    return parseSuccessTrueResponse(res.data);
  }

  async updateProject({ id, data }: Parameters<ProjectsApi['updateProject']>[0]) {
    const res = await this.api.put(API_ROUTES.PROJECTS.UPDATE(id), data);
    return parseProjectResponse(res.data);
  }

  async loadExample() {
    const res = await this.api.get(API_ROUTES.PROJECTS.LOAD_EXAMPLE());
    return parseCanvasResponse(res.data);
  }
}
