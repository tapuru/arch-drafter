import type { Stage } from 'konva/lib/Stage';

import React from 'react';

import { TOOLS, type AppShape, type Tool, type ToolManager } from '@/features/tools/shared';

//TODO: event logic here
const sendAddShapeEventMock = (shape: AppShape) => {
  console.log('EMITING ADD SHAPE EVENT:');
  console.log(JSON.stringify(shape));
};

export const useToolHandlers = ({
  stage,
  isPaintingRef,
  currentToolManager,
  currentShapeIdRef,
}: {
  stage: Stage | null;
  currentToolManager: ToolManager<Tool>;
  isPaintingRef: React.RefObject<boolean | null>;
  currentShapeIdRef: React.RefObject<string | null>;
}) => {
  const handleToolsPointerDown = () => {
    if (currentToolManager.name === TOOLS.SELECT || !stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    isPaintingRef.current = true;

    const id = currentToolManager.initShape(pos);
    currentShapeIdRef.current = id;
  };

  const handleToolsPointerMove = () => {
    if (currentToolManager.name === TOOLS.SELECT || !stage || !isPaintingRef.current) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    currentToolManager.extendShape(pos);
  };

  const handleToolsPointerUp = () => {
    isPaintingRef.current = false;

    if (currentToolManager.name === TOOLS.SELECT) return;

    currentToolManager.finishShape(sendAddShapeEventMock);
  };

  return { handleToolsPointerMove, handleToolsPointerDown, handleToolsPointerUp };
};
