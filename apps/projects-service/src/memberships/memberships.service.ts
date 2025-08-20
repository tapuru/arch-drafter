import { AppRpcException } from '@bc-arch-drafter/lib';
import { Invite, InviteStatusSchema, MembershipService, UserId, UserProjectRoleSchema } from '@bc-arch-drafter/model';
import { InvitesRepository, MembershipsRepository } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MemberhipsServiceImpl {
  constructor(
    private readonly memberhipsRepository: MembershipsRepository,
    private readonly invitesRepository: InvitesRepository,
  ) {}

  async getUserInvites(userId: Parameters<MembershipService['getUserInvites']>[0]) {
    const invites = await this.invitesRepository.findMany({ filters: { userId } });
    return invites;
  }

  async getProjectInvites(projectId: Parameters<MembershipService['getProjectInvites']>[0]) {
    const invites = await this.invitesRepository.findMany({ filters: { projectId } });
    return invites;
  }

  async sendInvite({ projectId, senderId, userId }: Parameters<MembershipService['sendInvite']>[0]) {
    const candidate = await this.invitesRepository.findMany({ filters: { projectId, userId } });
    if (candidate.totalCount > 0)
      throw new AppRpcException('This user have already been invited to this project', HttpStatus.BAD_REQUEST);

    const invite = await this.invitesRepository.create({ userId, projectId, senderId });

    return invite;
  }

  async acceptInvite({ id, userId }: Parameters<MembershipService['acceptInvite']>[0]) {
    const invite = await this.invitesRepository.findById(id);
    if (!invite) throw new AppRpcException('Invite with this id does not exist', HttpStatus.NOT_FOUND);
    await this.checkCanModifyOwnInvite(invite, userId);
    const acceptedInvite = await this.invitesRepository.update(id, { status: InviteStatusSchema.enum.accepted });
    //TODO: remove hardcoded role
    await this.memberhipsRepository.create({
      projectId: invite.projectId,
      userId,
      role: UserProjectRoleSchema.enum.member,
    });

    return acceptedInvite;
  }

  async rejectInvite({ id, userId }: Parameters<MembershipService['rejectInvite']>[0]) {
    const invite = await this.invitesRepository.findById(id);
    if (!invite) throw new AppRpcException('Invite with this id does not exist', HttpStatus.NOT_FOUND);
    await this.checkCanModifyOwnInvite(invite, userId);
    const rejectedInvite = await this.invitesRepository.update(id, { status: InviteStatusSchema.enum.rejected });

    return rejectedInvite;
  }

  async cancelInvite({ cancelerId, id }: Parameters<MembershipService['cancelInvite']>[0]) {
    const invite = await this.invitesRepository.findById(id, { relations: { project: true } });
    if (!invite) throw new AppRpcException('Invite with this id does not exist', HttpStatus.NOT_FOUND);
    if (invite.project.ownerId !== cancelerId && invite.senderId !== cancelerId) {
      throw new AppRpcException('You have no permission to modify this invite', HttpStatus.FORBIDDEN);
    }
    await this.invitesRepository.update(id, { status: InviteStatusSchema.enum.canceled });
    //TODO: refactor this to return invite
    return { success: true } as const;
  }

  private async checkCanModifyOwnInvite(invite: Invite, userId: UserId) {
    if (userId && invite.userId !== userId) {
      throw new AppRpcException('This invite does not belong to this user', HttpStatus.FORBIDDEN);
    }
    if (invite.status !== 'pending') {
      throw new AppRpcException(
        'This invite already have ether been accepted, rejected or canceled by its sender',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
