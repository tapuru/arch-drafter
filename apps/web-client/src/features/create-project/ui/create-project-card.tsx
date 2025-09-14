import { Link } from 'react-router';

import { Card, CardHeader, CardTitle } from '@bc-arch-drafter/ui';

export const CreateProjectCard = () => {
  return (
    <Link to="/projects/create" className="block">
      <Card className="hover:shadow-lg transition-shadow rounded-2xl">
        <CardHeader>
          <CardTitle>Create new project</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
