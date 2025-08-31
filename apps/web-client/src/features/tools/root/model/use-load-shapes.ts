import { useLoadRectangles } from '@/features/tools/rectangle';

import json from '../../example.json';
import { useLoadArrows } from '../../arrow/model/use-load-arrows';

export const useLoadShapes = () => {
  const { loadRectangles } = useLoadRectangles();
  const { loadArrows } = useLoadArrows();

  const handleLoadExample = () => {
    if (!json) return;
    loadRectangles(json.rectangles);
    loadArrows(json.arrows);
  };

  return { handleLoadExample };
};
