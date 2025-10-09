import type { Arrow } from '../../arrow/model/arrow.store';
import type { Rectangle } from '../../rectangle/model/rectangle.store';
import type { Scribble } from '../../scribble/model/scribble.store';

import { useLoadArrows } from '@/features/tools/arrow';
import { useLoadRectangles } from '@/features/tools/rectangle';
import { useLoadScribbles } from '@/features/tools/scribble';

import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '@/shared/api';
import { PROJECTS_ACTIONS } from '@bc-arch-drafter/model';

export const useLoadShapes = () => {
  const { loadRectangles, clearRectangles } = useLoadRectangles();
  const { loadArrows, clearArrows } = useLoadArrows();
  const { loadSapes: loadScribbles, clearScribbles } = useLoadScribbles();
  const { data, isLoading } = useQuery({ queryFn: projectsApi.loadExample, queryKey: [PROJECTS_ACTIONS.LOAD_EXAMPLE] });

  const handleLoad = ({
    arrows,
    rectangles,
    scribbles,
  }: {
    rectangles: Rectangle[];
    arrows: Arrow[];
    scribbles: Scribble[];
  }) => {
    loadRectangles(rectangles);
    loadArrows(arrows);
    loadScribbles(scribbles);
  };

  const handleClearAll = () => {
    clearArrows();
    clearRectangles();
    clearScribbles();
  };

  console.log('AAAAAAA');
  console.log(data);

  const handleLoadExample = () => {
    if (isLoading || !data) return;
    handleLoad(data.data as any);
  };

  return { handleLoadExample, handleClearAll, handleLoad };
};
