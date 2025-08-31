import { RectangleShapes } from '@/features/tools/rectangle';

import { useShapeHandlers } from '../model/use-shape-handlers';
import { ArrowShapes } from '../../arrow';

export const Shapes = () => {
  const { handleShapeClick } = useShapeHandlers();

  return (
    <>
      <RectangleShapes onClick={handleShapeClick} />
      <ArrowShapes onClick={handleShapeClick} />
    </>
  );
};
