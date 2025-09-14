import { ProjectsApiImpl } from '@bc-arch-drafter/client-services';

export const projectsApi = new ProjectsApiImpl(import.meta.env.VITE_GATEWAY_URL);
