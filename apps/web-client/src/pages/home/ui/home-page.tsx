import { BoardExample } from '@/features/board';
import { ProjectsList } from '@/features/projects-list';

export const HomePage = () => {
  // const navigate = useNavigate();
  // const toBaseForm = () => navigate(WEB_ROUTES.EXAMPLE);

  // const { data } = useQuery({
  //   queryKey: ['projects'],
  //   queryFn: () => membershipsApi.getUserMemberships({ userId: '07482cd4-ce77-460f-a6bf-5cba0902997b' as UserId }),
  // });

  return (
    <div className="flex flex-col items-center justify-center m-5 gap-5">
      {/* Home. Sweet Home... */}
      {/* <Button onClick={toBaseForm}>Go to Base Form</Button> */}
      {/* <BoardExample /> */}
      <ProjectsList />
    </div>
  );
};
