import type { Vector2d } from 'konva/lib/types';

import { v4 } from 'uuid';

import { type AppShape, createToolManagerHook, TOOLS } from '@/features/tools/shared';

import { DEFAULT_RECTANGLE_CONFIG } from '../lib/defaults.const';
import { useRectanglesActions, useSelectRectangleById, useSelectRectangles } from './rectangle.store';

//TODO: add currentShape type

export const useRectangleManager = createToolManagerHook((currentShapeId) => {
  const { addRectangle, updateRectangle } = useRectanglesActions();
  const currentRectangle = useSelectRectangleById(currentShapeId);
  useSelectRectangles();

  const initShape = (pos: Vector2d) => {
    const id = v4();

    addRectangle({
      id,
      x: pos.x,
      y: pos.y,
      height: DEFAULT_RECTANGLE_CONFIG.HEIGHT,
      width: DEFAULT_RECTANGLE_CONFIG.WIDTH,
      strokeColor: DEFAULT_RECTANGLE_CONFIG.STROKE_COLOR,
      strokeWidth: DEFAULT_RECTANGLE_CONFIG.STROKE_WIDTH,
      fill: DEFAULT_RECTANGLE_CONFIG.FILL_COLOR,
    });

    return id;
  };

  const extendShape = (pos: Vector2d) => {
    if (!currentShapeId || !currentRectangle) return;

    updateRectangle({
      id: currentShapeId,
      pos,
    });
  };

  const finishShape = (cb: (shape: AppShape) => void) => {
    if (!currentRectangle) return;
    cb(currentRectangle);
  };

  return { initShape, extendShape, finishShape, name: TOOLS.RECTANGLE };
});
