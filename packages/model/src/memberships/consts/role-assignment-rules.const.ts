import { UserProjectRole, UserProjectRoleSchema } from '../porject-roles.schema';

export const PROJECT_ROLE_ASSIGNMENT_RULES: Record<UserProjectRole, UserProjectRole[]> = {
  [UserProjectRoleSchema.enum.owner]: [
    UserProjectRoleSchema.enum.owner,
    UserProjectRoleSchema.enum.member,
    UserProjectRoleSchema.enum.viewer,
  ],
  [UserProjectRoleSchema.enum.member]: [UserProjectRoleSchema.enum.member, UserProjectRoleSchema.enum.viewer],
  [UserProjectRoleSchema.enum.viewer]: [],
};
