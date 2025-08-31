/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/switch-case-braces */
import type { Stage } from 'konva/lib/Stage';

import { useRef } from 'react';

import { useArrows, useSelectArrows } from '@/features/tools/arrow';
import { useRectangles, useSelectRectangles } from '@/features/tools/rectangle';
import { TOOLS, useSelectCurrentTool, type AppShape } from '@/features/tools/shared';

export const useTools = ({ stage }: { stage: Stage | null }) => {
  //TODO: make this uuid everywhere (add type to model package)
  const currentShapeIdRef = useRef<string | null>(null);
  const isPaintingRef = useRef<boolean>(false);

  useSelectRectangles();
  useSelectArrows();

  const currentTool = useSelectCurrentTool();

  const { extendRectangle, initRectanlge, finishRectangle } = useRectangles({
    currentShapeId: currentShapeIdRef.current,
  });
  const { extendArrow, finishArrow, initArrow } = useArrows({ currentShapeId: currentShapeIdRef.current });

  const handleToolsPointerDown = () => {
    if (currentTool === TOOLS.SELECT || !stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    let id: string | null = null;
    isPaintingRef.current = true;

    switch (currentTool) {
      case TOOLS.RECTANGLE:
        id = initRectanlge({ pos });
        break;
      case TOOLS.ARROW:
        id = initArrow({ pos });
        break;
      default:
        throw new Error('unknown tool');
    }

    currentShapeIdRef.current = id;
  };

  const handleToolsPointerMove = () => {
    if (currentTool === TOOLS.SELECT || !stage || !isPaintingRef.current) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    switch (currentTool) {
      case TOOLS.RECTANGLE:
        extendRectangle({ pos });
        break;
      case TOOLS.ARROW:
        extendArrow({ pos });
        break;
    }
  };

  //TODO: event logic here
  const sendAddShapeEventMock = (shape: AppShape) => {
    console.log('EMITING ADD SHAPE EVENT:');
    console.log(JSON.stringify(shape));
  };

  const handleToolsPointerUp = () => {
    isPaintingRef.current = false;

    if (currentTool === TOOLS.SELECT) return;

    switch (currentTool) {
      case TOOLS.RECTANGLE:
        finishRectangle(sendAddShapeEventMock);
        break;
      case TOOLS.ARROW:
        finishArrow(sendAddShapeEventMock);
        break;
    }
  };

  return { handleToolsPointerMove, handleToolsPointerDown, handleToolsPointerUp };
};
