import { useLoadArrows } from '@/features/tools/arrow';
import { useLoadRectangles } from '@/features/tools/rectangle';
import { useLoadScribbles } from '@/features/tools/scribble';

import json from '../../example.json';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PROJECTS_ACTIONS, type ProjectId } from '@bc-arch-drafter/model';
import { useParams } from 'react-router';
import { projectsApi } from '@bc-arch-drafter/client-services';
import { useSave } from './use-save-shapes';
import type { Rectangle } from '../../rectangle/model/rectangle.store';
import type { Arrow } from '../../arrow/model/arrow.store';
import type { Scribble } from '../../scribble/model/scribble.store';

export const useLoadShapes = () => {
  const { loadRectangles, clearRectangles } = useLoadRectangles();
  const { loadArrows, clearArrows } = useLoadArrows();
  const { loadSapes: loadScribbles, clearScribbles } = useLoadScribbles();

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

  const handleLoadExample = () => {
    if (!json) return;
    handleLoad(json.shapes);
  };

  return { handleLoadExample, handleClearAll, handleLoad };
};
