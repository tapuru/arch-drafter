import type React from 'react';

export const ProjectPageLayout = ({ tools, board }: { tools: React.ReactNode; board: React.ReactNode }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 z-10 w-full py-2 ">{tools}</div>
      <div>{board}</div>
    </div>
  );
};
