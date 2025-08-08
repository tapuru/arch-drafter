import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@bc-arch-drafter/ui';

export const BaseForm = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="your@email.com" autoComplete="email" />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <a href="#" className="text-sm text-primary underline">
                  Forgot password?
                </a>
              </div>
              <Input id="password" placeholder="••••••••" autoComplete="current-password" />
            </div>

            {/* Login Button */}
            <Button className="w-full">Sign In</Button>

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

          {/* Sign Up Link */}
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-primary underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
