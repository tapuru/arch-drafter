import { useMutation } from '@tanstack/react-query';
import { useSelectArrows } from '../../arrow';
import type { Arrow } from '../../arrow/model/arrow.store';
import { useSelectRectangles } from '../../rectangle';
import type { Rectangle } from '../../rectangle/model/rectangle.store';
import { useSelectScribbles } from '../../scribble';
import type { Scribble } from '../../scribble/model/scribble.store';
import { projectsApi } from '@bc-arch-drafter/client-services';
import { useParams } from 'react-router';
import type { ProjectId } from '@bc-arch-drafter/model';

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
  const { projectId } = useParams();

  const { mutate } = useMutation({ mutationFn: projectsApi.updateProject });

  const handleSave = async () => {
    const dto: SaveShapesDto = {
      someMetadata: 'example metadata field',
      shapes: {
        rectangles,
        arrows,
        scribbles,
      },
    };

    mutate({ id: projectId as ProjectId, data: { canvasJson: dto.shapes } });
  };

  return { handleSave };
};
