import { Board } from '@/features/board';
import { Shapes, ToolBar, ToolsProvider } from '@/features/tools/root';

import { ProjectPageLayout } from './project-page.layout';

//TODO: add on bg click
export const ProjectPage = () => {
  return (
    <ProjectPageLayout
      tools={<ToolBar />}
      board={
        <ToolsProvider
          renderBoard={({ onPointerDown, onPointerMove, onPointerUp, stageRef }) => (
            <Board
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              shapes={<Shapes />}
              stageRef={stageRef}
              onBgClick={() => {}}
            />
          )}
        />
      }
    />
  );
};
