import { useNavigate } from 'react-router';

import { WEB_ROUTES } from '@bc-arch-drafter/contracts';
import { Button } from '@bc-arch-drafter/ui';


export const HomePage = () => {

  const navigate = useNavigate();
  const toBaseForm = () => navigate(WEB_ROUTES.EXAMPLE);

  return (
    <div className="flex flex-col items-center justify-center m-5 gap-5">
      Home. Sweet Home...
      <Button onClick={toBaseForm}>Go to Base Form</Button>
    </div>
  );
};

