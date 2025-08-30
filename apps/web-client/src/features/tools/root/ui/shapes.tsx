import { RectangleShapes } from '@/features/tools/rectangle';

import { useShapeHandlers } from '../model/use-shape-handlers';

export const Shapes = () => {
  const { handleShapeClick } = useShapeHandlers();

  return (
    <>
      <RectangleShapes onClick={handleShapeClick} />
    </>
  );
};
