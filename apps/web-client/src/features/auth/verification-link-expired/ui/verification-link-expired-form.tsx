import { useState } from 'react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@bc-arch-drafter/ui';

import { DragonClockImg } from '@/shared';

export const VerificationLinkExpiredForm = () => {
  const [_, setIsSendingLink] = useState(false);

  const sendLinkHandler = () => {
    setIsSendingLink(true);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Email verification link expired</CardTitle>
        <CardDescription>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Button className="w-full" onClick={sendLinkHandler}>
            Resend Link
          </Button>
          <div className="flex items-center justify-center">
            <img src={DragonClockImg} width={250} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
