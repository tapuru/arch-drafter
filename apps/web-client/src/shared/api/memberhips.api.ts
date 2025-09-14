import { MembershipsApiImpl } from '@bc-arch-drafter/client-services';

export const membershipsApi = new MembershipsApiImpl(import.meta.env.VITE_GATEWAY_URL);
