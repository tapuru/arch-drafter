import type { Vector2d } from 'konva/lib/types';

import { v4 } from 'uuid';

import { createToolManagerHook, TOOLS, type AppShape } from '@/features/tools/shared';

import { DEFAULT_ARROW_CONFIG } from '../lib/defaults.const';
import { useArrowsActions, useSelectArrowById, useSelectArrows } from './arrow.store';

export const useArrowManager = createToolManagerHook((currentShapeId) => {
  const { addArrow, updateArrow } = useArrowsActions();
  const currentArrow = useSelectArrowById(currentShapeId);
  useSelectArrows();

  const initShape = (pos: Vector2d) => {
    const id = v4();

    const realOffset = DEFAULT_ARROW_CONFIG.OFFSET;

    addArrow({
      id,
      points: [pos.x, pos.y, pos.x + realOffset, pos.y + realOffset],
      strokeColor: DEFAULT_ARROW_CONFIG.STROKE_COLOR,
      strokeWidth: DEFAULT_ARROW_CONFIG.STROKE_WIDTH,
      fill: DEFAULT_ARROW_CONFIG.FILL_COLOR,
    });

    return id;
  };

  const extendShape = (pos: Vector2d) => {
    if (!currentShapeId || !currentArrow) return;

    updateArrow({
      id: currentShapeId,
      pos,
    });
  };

  const finishShape = (cb: (shape: AppShape) => void) => {
    if (!currentArrow) return;
    cb(currentArrow);
  };

  return { initShape, extendShape, finishShape, name: TOOLS.ARROW };
});
