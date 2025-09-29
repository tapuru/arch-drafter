import { UserId, TokenUuid } from '@bc-arch-drafter/model';

export type UpdateTokenRequestDto = {
  userId?: UserId;
  tokenUuid?: TokenUuid;
};
