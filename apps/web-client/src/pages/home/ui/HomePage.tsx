import { useNavigate } from 'react-router';

import { Button } from '@bc-arch-drafter/ui';

import { MainRoutesFullPaths } from '@/shared/config/routing';

export const HomePage = () => {

  const navigate = useNavigate();
  const toBaseForm = () => navigate(MainRoutesFullPaths.EXAMPLE);

  return (
    <div className="flex flex-col items-center justify-center m-5 gap-5">
      Home. Sweet Home...
      <Button onClick={toBaseForm}>Go to Base Form</Button>
    </div>
  );
};

