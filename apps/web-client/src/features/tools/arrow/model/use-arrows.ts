import type { Vector2d } from 'konva/lib/types';
import { useArrowsActions, useSelectArrowById } from './arrow.store';
import { DEFAULT_ARROW_CONFIG } from '../lib/defaults.const';
import { v4 } from 'uuid';
import type { AppShape } from '../../shared';

export const useArrows = ({ currentShapeId }: { currentShapeId: string | null }) => {
  const { addArrow, updateArrow } = useArrowsActions();
  const currentArrow = useSelectArrowById(currentShapeId);

  const initArrow = ({
    pos,
    fillColor,
    strokeColor,
    strokeWidth,
    offset,
  }: {
    pos: Vector2d;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    offset?: number;
  }) => {
    const id = v4();

    const realOffset = offset ?? DEFAULT_ARROW_CONFIG.OFFSET;

    addArrow({
      id,
      points: [pos.x, pos.y, pos.x + realOffset, pos.y + realOffset],
      strokeColor: strokeColor ?? DEFAULT_ARROW_CONFIG.STROKE_COLOR,
      strokeWidth: strokeWidth ?? DEFAULT_ARROW_CONFIG.STROKE_WIDTH,
      fill: fillColor ?? DEFAULT_ARROW_CONFIG.FILL_COLOR,
    });

    return id;
  };

  const extendArrow = ({ pos }: { pos: Vector2d }) => {
    if (!currentShapeId || !currentArrow) return;

    updateArrow({
      id: currentShapeId,
      pos,
    });
  };

  const finishArrow = (cb: (shape: AppShape) => void) => {
    if (!currentArrow) return;
    cb(currentArrow);
  };

  return { initArrow, extendArrow, finishArrow };
};
