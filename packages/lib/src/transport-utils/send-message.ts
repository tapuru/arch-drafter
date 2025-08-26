import { AppApiSpec } from '@bc-arch-drafter/contracts';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export const sendMessage = async <TAction extends keyof AppApiSpec>({
  client,
  pattern,
  payload,
}: {
  client: ClientProxy;
  pattern: { cmd: TAction };
  payload: AppApiSpec[TAction]['request'];
}): Promise<AppApiSpec[TAction]['response']> => {
  const res = await lastValueFrom(
    client.send<AppApiSpec[TAction]['response'], AppApiSpec[TAction]['request']>(pattern, payload),
  );
  return res;
};
