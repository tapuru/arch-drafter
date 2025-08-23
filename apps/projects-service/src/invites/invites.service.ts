import { AppRpcException } from '@bc-arch-drafter/lib';
import {
  Invite,
  InvitesService,
  InviteStatusSchema,
  PROJECT_ROLE_ASSIGNMENT_RULES,
  UserId,
  UserProjectRole,
} from '@bc-arch-drafter/model';
import { InvitesRepository, MembershipsRepository, TransactionManager } from '@bc-arch-drafter/postgres-db';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class InvitesServiceImpl implements InvitesService {
  constructor(
    private readonly memberhipsRepository: MembershipsRepository,
    private readonly invitesRepository: InvitesRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async getUserInvites(userId: Parameters<InvitesService['getUserInvites']>[0]) {
    const invites = await this.invitesRepository.findMany({ filters: { userId } });
    return invites;
  }

  async getProjectInvites(projectId: Parameters<InvitesService['getProjectInvites']>[0]) {
    const invites = await this.invitesRepository.findMany({ filters: { projectId } });
    return invites;
  }

  async sendInvite({ projectId, senderId, userId, role }: Parameters<InvitesService['sendInvite']>[0]) {
    const membershipCandidate = await this.memberhipsRepository.findByProjectAndUser({ projectId, userId });
    if (membershipCandidate)
      throw new AppRpcException('This user already participates this project', HttpStatus.BAD_REQUEST);

    const candidate = await this.invitesRepository.findMany({ filters: { projectId, userId } });
    if (candidate.totalCount > 0)
      throw new AppRpcException('This user have already been invited to this project', HttpStatus.BAD_REQUEST);

    const senderMembership = await this.memberhipsRepository.findByProjectAndUser({ projectId, userId: senderId });
    if (!senderMembership)
      throw new AppRpcException('Trying to send invite to a project you do not participate into', HttpStatus.FORBIDDEN);

    this.validateRoleAssignment(senderMembership.role, role);

    const invite = await this.invitesRepository.create({ userId, projectId, senderId, role });

    return invite;
  }

  async acceptInvite({ id, userId }: Parameters<InvitesService['acceptInvite']>[0]) {
    const invite = await this.invitesRepository.findById(id);
    if (!invite) throw new AppRpcException('Invite with this id does not exist', HttpStatus.NOT_FOUND);

    await this.checkCanModifyOwnInvite(invite, userId);

    const membershipCandidate = await this.memberhipsRepository.findByProjectAndUser({
      projectId: invite.projectId,
      userId: invite.userId,
    });

    if (membershipCandidate)
      throw new AppRpcException('This user already participates in this project', HttpStatus.BAD_REQUEST);

    const res = await this.transactionManager.runInTransaction(async ({ invites, memberships }) => {
      const acceptedInvite = await invites.update(id, { status: InviteStatusSchema.enum.accepted });
      await memberships.create({
        projectId: invite.projectId,
        userId,
        role: invite.role,
        inviteId: acceptedInvite.id,
      });

      return acceptedInvite;
    });

    return res;
  }

  async rejectInvite({ id, userId }: Parameters<InvitesService['rejectInvite']>[0]) {
    const invite = await this.invitesRepository.findById(id);
    if (!invite) throw new AppRpcException('Invite with this id does not exist', HttpStatus.NOT_FOUND);
    await this.checkCanModifyOwnInvite(invite, userId);
    const rejectedInvite = await this.invitesRepository.update(id, { status: InviteStatusSchema.enum.rejected });

    return rejectedInvite;
  }

  async cancelInvite({ cancelerId, id }: Parameters<InvitesService['cancelInvite']>[0]) {
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

  private validateRoleAssignment(assingnerRole: UserProjectRole, userRole: UserProjectRole) {
    const res = PROJECT_ROLE_ASSIGNMENT_RULES[assingnerRole].includes(userRole);
    if (!res) throw new AppRpcException('Invalid role assignment', HttpStatus.FORBIDDEN);
    return true;
  }
}
