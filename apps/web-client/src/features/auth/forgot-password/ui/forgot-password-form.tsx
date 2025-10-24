import { useState } from 'react';
import { useNavigate } from 'react-router';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@bc-arch-drafter/ui';

export const ForgotPasswordForm = () => {
  const [isSendingLink, setIsSendingLink] = useState(false);

  const navigate = useNavigate();

  const sendLinkHandler = () => {
    setIsSendingLink(true);
  };

  const toLoginForm = () => {
    navigate(WEB_ROUTES.LOGIN);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email address to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="your@email.com" autoComplete="email" />
          </div>
          {isSendingLink && (
            <div className="mt-4 text-center text-sm">
              The link has been sent by email. If you don’t receive an email send link again
            </div>
          )}
          <Button className="w-full" onClick={sendLinkHandler}>
            Send Reset Link {isSendingLink && 'Again'}
          </Button>
          <div className="mt-4 text-center text-sm">
            <a onClick={toLoginForm} className="text-primary underline cursor-pointer">
              Back to Sign in
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
