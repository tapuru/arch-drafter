import { useRectanglesActions, type Rectangle } from './rectangle.store';

export const useLoadRectangles = () => {
  const { setRectangles, clearRectangles } = useRectanglesActions();

  const loadRectangles = (rectangles: Rectangle[]) => {
    setRectangles(rectangles);
  };

  return { loadRectangles, clearRectangles };
};
