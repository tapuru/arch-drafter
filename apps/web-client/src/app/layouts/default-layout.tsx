import { Outlet } from 'react-router';

export const DefaultLayout = () => {
  //todo: продумать верстку (хэдер, сайдбар, футер)
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};