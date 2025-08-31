import { useSelectArrows } from '../../arrow';
import type { Arrow } from '../../arrow/model/arrow.store';
import { useSelectRectangles } from '../../rectangle';
import type { Rectangle } from '../../rectangle/model/rectangle.store';
import { useSelectScribbles } from '../../scribble';
import type { Scribble } from '../../scribble/model/scribble.store';

//TODO: write this type in contracts (model?) package
type SaveShapesDto = {
  someMetadata: string;
  shapes: {
    rectangles: Rectangle[];
    arrows: Arrow[];
    scribbles: Scribble[];
  };
};

export const useSaveShapes = () => {
  const rectangles = useSelectRectangles();
  const scribbles = useSelectScribbles();
  const arrows = useSelectArrows();

  const handleSave = () => {
    const res: SaveShapesDto = {
      someMetadata: 'example metadata field',
      shapes: {
        rectangles,
        arrows,
        scribbles,
      },
    };

    // save logic
    console.log(JSON.stringify(res));
  };

  return { handleSave };
};
