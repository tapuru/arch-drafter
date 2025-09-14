import {
  API_ROUTES,
  MembershipsApi,
  parseManyMembershipResponse,
  parseOneMembershipResponse,
  parseSuccessTrueResponse,
} from '@bc-arch-drafter/contracts';

import { createApi } from '@/api';

export class MembershipsApiImpl implements MembershipsApi {
  private api;

  constructor(baseUrl: string) {
    this.api = createApi(baseUrl);
  }

  async create(data: Parameters<MembershipsApi['create']>[0]) {
    const res = await this.api.post(API_ROUTES.MEMBERHIPS.ROOT, data);
    return parseOneMembershipResponse(res.data);
  }

  async getUserMemberships({ userId }: Parameters<MembershipsApi['getUserMemberships']>[0]) {
    const res = await this.api.get(API_ROUTES.MEMBERHIPS.GET_USER_MEMBERSHIPS(userId));
    return parseManyMembershipResponse(res.data);
  }

  async leaveProject(data: Parameters<MembershipsApi['leaveProject']>[0]) {
    const res = await this.api.patch(API_ROUTES.MEMBERHIPS.LEAVE_PROJECT, data);
    return parseSuccessTrueResponse(res.data);
  }

  async removeFromProject(data: Parameters<MembershipsApi['removeFromProject']>[0]) {
    const res = await this.api.patch(API_ROUTES.MEMBERHIPS.REMOVE_FROM_PROJECT, data);
    return parseSuccessTrueResponse(res.data);
  }
}
