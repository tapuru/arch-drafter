import { useLoadRectangles } from '@/features/tools/rectangle';

import json from '../../example.json';

export const useLoadShapes = () => {
  const { loadRectangles } = useLoadRectangles();

  const handleLoadExample = () => {
    console.log(json);
    if (!json) return;
    loadRectangles(json.rectangles);
  };

  return { handleLoadExample };
};
