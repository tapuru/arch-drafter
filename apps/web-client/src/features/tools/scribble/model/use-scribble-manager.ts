import type { Vector2d } from 'konva/lib/types';

import { v4 } from 'uuid';

import { createToolManagerHook, TOOLS, type AppShape } from '@/features/tools/shared';

import { useScribblesActions, useSelectScribbleById, useSelectScribbles } from './scribble.store';

export const useScribbleManager = createToolManagerHook((currentShapeId) => {
  const { addScribble, updateScribble } = useScribblesActions();
  const currentScribble = useSelectScribbleById(currentShapeId);
  useSelectScribbles();

  const initShape = (pos: Vector2d) => {
    const id = v4();

    addScribble({
      id,
      points: [pos.x, pos.y],
    });

    return id;
  };

  const extendShape = (pos: Vector2d) => {
    if (!currentShapeId || !currentScribble) return;

    updateScribble(currentShapeId, (prev) => ({
      ...prev,
      points: [...(prev.points as number[]), pos.x, pos.y],
    }));
  };

  const finishShape = (cb: (shape: AppShape) => void) => {
    if (!currentScribble) return;
    cb(currentScribble);
  };

  return { initShape, extendShape, finishShape, name: TOOLS.SCRIBBLE };
});
