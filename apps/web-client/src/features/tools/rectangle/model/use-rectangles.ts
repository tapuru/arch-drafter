import type { Vector2d } from 'konva/lib/types';

import { v4 } from 'uuid';

import { DEFAULT_RECTANGLE_CONFIG } from '../lib/defaults.const';
import { useRectanglesActions, useSelectRectangleById, type Rectangle } from './rectangle.store';
import type { AppShape } from '../../shared/lib/types';

//TODO: add currentShape type
export const useRectangles = ({ currentShapeId }: { currentShapeId: string | null }) => {
  const { addRectangle, updateRectangle } = useRectanglesActions();
  const currentRectangle = useSelectRectangleById(currentShapeId);

  const initRectanlge = ({
    pos,
    fillColor,
    strokeColor,
    strokeWidth,
  }: {
    pos: Vector2d;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
  }) => {
    const id = v4();

    addRectangle({
      id,
      x: pos.x,
      y: pos.y,
      height: DEFAULT_RECTANGLE_CONFIG.HEIGHT,
      width: DEFAULT_RECTANGLE_CONFIG.WIDTH,
      strokeColor: strokeColor ?? DEFAULT_RECTANGLE_CONFIG.STROKE_COLOR,
      strokeWidth: strokeWidth ?? DEFAULT_RECTANGLE_CONFIG.STROKE_WIDTH,
      fill: fillColor ?? DEFAULT_RECTANGLE_CONFIG.FILL_COLOR,
    });

    return id;
  };

  const extendRectangle = ({ pos }: { pos: Vector2d }) => {
    if (!currentShapeId || !currentRectangle) return;

    updateRectangle({
      id: currentShapeId,
      pos,
    });
  };

  const finishRectangle = (cb: (shape: AppShape) => void) => {
    if (!currentRectangle) return;
    cb(currentRectangle);
  };

  return { extendRectangle, initRectanlge, finishRectangle };
};
