/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/switch-case-braces */
import React, { useRef } from 'react';

import { useArrowManager } from '@/features/tools/arrow';
import { useRectangleManager } from '@/features/tools/rectangle';
import { TOOLS, useSelectCurrentTool, type Tool, type ToolManager } from '@/features/tools/shared';
import { useScribbleManager } from '../../scribble';

export const useToolManagers = (): {
  currentToolManager: ToolManager<Tool>;
  isPaintingRef: React.RefObject<boolean | null>;
  currentShapeIdRef: React.RefObject<string | null>;
} => {
  //TODO: make this uuid everywhere (add type to model package)
  const currentShapeIdRef = useRef<string | null>(null);
  const isPaintingRef = useRef<boolean>(false);

  const rectangleManager = useRectangleManager(currentShapeIdRef.current);
  const arrowManager = useArrowManager(currentShapeIdRef.current);
  const scribbleManager = useScribbleManager(currentShapeIdRef.current);

  const currentTool = useSelectCurrentTool();

  let currentToolManager: ToolManager<Tool> = { name: TOOLS.SELECT };

  switch (currentTool) {
    case TOOLS.RECTANGLE:
      currentToolManager = rectangleManager;
      break;
    case TOOLS.ARROW:
      currentToolManager = arrowManager;
      break;
    case TOOLS.SCRIBBLE:
      currentToolManager = scribbleManager;
      break;
    case TOOLS.SELECT:
      currentToolManager = { name: TOOLS.SELECT };
      break;
  }

  return { currentToolManager, isPaintingRef, currentShapeIdRef };
};
