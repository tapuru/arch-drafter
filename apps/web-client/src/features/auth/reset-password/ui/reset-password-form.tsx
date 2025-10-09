import { useNavigate } from 'react-router';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@bc-arch-drafter/ui';

export const ResetPasswordForm = () => {

  const navigate = useNavigate();

  const toLoginForm = () => {
    navigate(WEB_ROUTES.LOGIN);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>Enter your new password to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  New Password
                </label>
              </div>
              <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Confirm Password
                </label>
              </div>
              <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
            </div>
          </div>
          <Button onClick={toLoginForm} className="w-full">Reset Password</Button>
        </div>
      </CardContent>
    </Card>
  );
};