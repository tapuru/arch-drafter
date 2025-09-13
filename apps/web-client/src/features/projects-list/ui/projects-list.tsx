import { MEMBERSHIPS_ACTIONS } from '@bc-arch-drafter/model';
import { useQuery } from '@tanstack/react-query';
import { membershipsApi } from '@bc-arch-drafter/client-services';
import { MOCK_USER_ID } from '@/shared/mocks';
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@bc-arch-drafter/ui';
import { ProjectsListItem } from './projects-list-item';

export const ProjectsList = () => {
  const { data, error } = useQuery({
    queryKey: [MEMBERSHIPS_ACTIONS.GET_USER_MEMBERHIPS, MOCK_USER_ID],
    queryFn: () => membershipsApi.getUserMemberships({ userId: MOCK_USER_ID }),
  });

  if (error) {
    console.log(error);
    return <div>{JSON.stringify(error)}</div>;
  }

  if (!data?.data.items?.length) {
    return <p className="text-muted-foreground">No projects found</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.items.map((membership) => (
        <ProjectsListItem membership={membership} key={membership.id} />
      ))}
    </div>
  );
};
