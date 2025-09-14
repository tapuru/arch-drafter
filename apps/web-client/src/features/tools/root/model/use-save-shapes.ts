import type { Arrow } from '../../arrow/model/arrow.store';
import type { Rectangle } from '../../rectangle/model/rectangle.store';
import type { Scribble } from '../../scribble/model/scribble.store';
import type { ProjectId } from '@bc-arch-drafter/model';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { projectsApi } from '@/shared/api';

import { useSelectArrows } from '../../arrow';
import { useSelectRectangles } from '../../rectangle';
import { useSelectScribbles } from '../../scribble';

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

  const { mutate } = useMutation({ mutationFn: projectsApi.updateProject.bind(projectsApi) });

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
