import { useLoadRectangles } from '@/features/tools/rectangle';
import { useLoadScribbles } from '@/features/tools/scribble';

import json from '../../example.json';

export const useLoadShapes = () => {
  const { loadRectangles } = useLoadRectangles();
  const { loadArrows } = useLoadArrows();
  const { loadSapes: loadScribbles } = useLoadScribbles();

  const handleLoadExample = () => {
    if (!json) return;
    loadRectangles(json.shapes.rectangles);
    loadArrows(json.shapes.arrows);
    loadScribbles(json.shapes.scribbles);
  };

  return { handleLoadExample };
};
