import { AppRpcException } from '@bc-arch-drafter/lib';
import { MembershipService, UserProjectRoleSchema } from '@bc-arch-drafter/model';
import { MembershipsRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MemberhipsServiceImpl implements MembershipService {
  constructor(private readonly memberhipsRepository: MembershipsRepository) {}

  async getUserMemberships({ userId }: Parameters<MembershipService['getUserMemberships']>[0]) {
    const res = await this.memberhipsRepository.findMany({ filters: { userId }, relations: { project: true } });
    return res;
  }

  async leaveProject({ projectId, userId }: Parameters<MembershipService['leaveProject']>[0]) {
    const membership = await this.memberhipsRepository.findByProjectAndUser({ projectId, userId });
    if (!membership) throw new AppRpcException('This user is not a member of that project', HttpStatus.FORBIDDEN);

    await this.memberhipsRepository.softDelete(membership.id);
    return { success: true };
  }

  async removeFromProject({ projectId, removerId, userId }: Parameters<MembershipService['removeFromProject']>[0]) {
    const membership = await this.memberhipsRepository.findByProjectAndUser(
      { projectId, userId },
      { relations: { invite: true } },
    );
    if (!membership) throw new AppRpcException('This user is not a member of that project', HttpStatus.BAD_REQUEST);

    const removerMembership = await this.memberhipsRepository.findByProjectAndUser({ projectId, userId: removerId });
    if (!removerMembership) throw new AppRpcException('You do not participate in this project', HttpStatus.FORBIDDEN);
    if (
      removerMembership.role !== UserProjectRoleSchema.enum.owner &&
      membership.invite?.senderId !== removerMembership.id
    ) {
      throw new AppRpcException('You have no rights to remove this user from this project', HttpStatus.FORBIDDEN);
    }

    await this.memberhipsRepository.softDelete(membership.id);
    return { success: true } as const;
  }

  //not sure if this method will be used only by admins or not
  //leave it without role assignment check for now
  async create({ projectId, userId, role }: Parameters<MembershipService['create']>[0]) {
    const candidate = await this.memberhipsRepository.findByProjectAndUser({ projectId, userId });
    if (candidate) throw new AppRpcException('This user already participates in this project', HttpStatus.BAD_REQUEST);

    const membership = await this.memberhipsRepository.create({
      projectId,
      userId,
      role,
    });

    return membership;
  }
}
