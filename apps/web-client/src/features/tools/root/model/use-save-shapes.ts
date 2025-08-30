import { useSelectRectangles } from '../../rectangle';
import type { Rectangle } from '../../rectangle/model/rectangle.store';

//TODO: write this type in contracts (model?) package
type SaveShapesDto = {
  someMetadata: string;
  shapes: {
    rectangles: Rectangle[];
  };
};

export const useSaveShapes = () => {
  const rectangles = useSelectRectangles();

  const handleSave = () => {
    const res: SaveShapesDto = {
      someMetadata: 'example metadata field',
      shapes: {
        rectangles,
      },
    };

    // save logic
    console.log(JSON.stringify(res));
  };

  return { handleSave };
};
