import { useRectanglesActions, type Rectangle } from './rectangle.store';

export const useLoadRectangles = () => {
  const { setRectangles } = useRectanglesActions();

  const loadRectangles = (rectangles: Rectangle[]) => {
    setRectangles(rectangles);
  };

  return { loadRectangles };
};
