import { useScribblesActions, type Scribble } from './scribble.store';

export const useLoadScribbles = () => {
  const { setScribbles } = useScribblesActions();

  const loadSapes = (scribbles: Scribble[]) => {
    setScribbles(scribbles);
  };

  return { loadSapes };
};
