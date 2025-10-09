import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@bc-arch-drafter/ui';

export const ForgotPasswordForm = () => {
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
          <Button className="w-full">Send Reset Link</Button>
        </div>
      </CardContent>
    </Card>
  );
};