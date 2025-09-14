import type { Membership, Project } from '@bc-arch-drafter/model';

import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from '@bc-arch-drafter/ui';

export const ProjectsListItem = ({ membership }: { membership: Membership & { project: Project } }) => {
  return (
    <Link to={`/projects/${membership.project.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow rounded-2xl">
        <CardHeader>
          <CardTitle>{membership.project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Role: <span className="font-medium">{membership.role}</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
