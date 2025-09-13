import { useArrowsActions, type Arrow } from './arrow.store';

export const useLoadArrows = () => {
  const { setArrows, clearArrows } = useArrowsActions();

  const loadArrows = (shapes: Arrow[]) => {
    setArrows(shapes);
  };

  return { loadArrows, clearArrows };
};
