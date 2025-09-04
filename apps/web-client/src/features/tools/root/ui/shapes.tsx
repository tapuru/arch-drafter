import { Transformer } from 'react-konva';

import { ArrowShapes } from '@/features/tools/arrow';
import { RectangleShapes } from '@/features/tools/rectangle';
import { ScribbleShapes } from '@/features/tools/scribble';
import { useSelect } from '@/features/tools/select';

export const Shapes = () => {
  const { handleSelect, transformerRef } = useSelect();

  return (
    <>
      <RectangleShapes onClick={handleSelect} />
      <ArrowShapes onClick={handleSelect} />
      <ScribbleShapes onClick={handleSelect} />
      <Transformer ref={transformerRef} />
    </>
  );
};
