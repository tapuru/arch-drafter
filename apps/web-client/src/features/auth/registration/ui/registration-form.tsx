import { useNavigate } from 'react-router';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input }
  from '@bc-arch-drafter/ui';

export const RegistrationForm = () => {

  const navigate = useNavigate();

  const toLoginForm = () => {
    navigate(WEB_ROUTES.LOGIN)
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>Sign up to get started with your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">

          <div className="space-y-3">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="John Snow" autoComplete="name" />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" autoComplete="email" />
            </div>
          </div>

          {/* Password Fields */}
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
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

          <div className="space-y-3">
            <Button className="w-full">Sign up</Button>

            {/* Social Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Google
            </Button>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a onClick={toLoginForm} className="text-primary underline cursor-pointer">
            Sign in
          </a>
        </div>
      </CardContent>
    </Card>
  );
};