import { CreateProjectCard } from '@/features/create-project';
import { ProjectsList } from '@/features/projects-list';

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center m-5 gap-5">
      <ProjectsList />
      <CreateProjectCard />
    </div>
  );
};
