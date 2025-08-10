import { AppActions } from '@bc-arch-drafter/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export const sendMessage = async <TAction extends keyof AppActions>({
  client,
  pattern,
  payload,
}: {
  client: ClientProxy;
  pattern: { cmd: TAction };
  payload: AppActions[TAction]['request'];
}): Promise<AppActions[TAction]['response']> => {
  const res = await lastValueFrom(
    client.send<AppActions[TAction]['response'], AppActions[TAction]['request']>(pattern, payload),
  );
  return res;
};
