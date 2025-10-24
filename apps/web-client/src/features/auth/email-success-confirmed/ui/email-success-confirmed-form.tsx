import { useNavigate } from 'react-router';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@bc-arch-drafter/ui';

import { DragonCongratulationImg } from '@/shared';

export const EmailSuccessConfirmedForm = () => {
  const navigate = useNavigate();

  const toLoginForm = () => {
    navigate(WEB_ROUTES.LOGIN);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Congratulations!</CardTitle>
        <CardDescription>Your email has been confirmed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Button className="w-full" onClick={toLoginForm}>
            Sign In
          </Button>
          <div className="flex items-center justify-center">
            <img src={DragonCongratulationImg} width={250} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
