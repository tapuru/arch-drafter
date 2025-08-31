/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/switch-case-braces */
import React, { useRef } from 'react';

import { useArrowManager } from '@/features/tools/arrow';
import { useRectangleManager } from '@/features/tools/rectangle';
import { TOOLS, useSelectCurrentTool, type ToolManager } from '@/features/tools/shared';

export const useToolManagers = (): {
  currentToolManager: ToolManager;
  isPaintingRef: React.RefObject<boolean | null>;
  currentShapeIdRef: React.RefObject<string | null>;
} => {
  //TODO: make this uuid everywhere (add type to model package)
  const currentShapeIdRef = useRef<string | null>(null);
  const isPaintingRef = useRef<boolean>(false);

  const rectangleManager = useRectangleManager(currentShapeIdRef.current);
  const arrowManager = useArrowManager(currentShapeIdRef.current);

  const currentTool = useSelectCurrentTool();

  let currentToolManager: ToolManager = rectangleManager;

  switch (currentTool) {
    case TOOLS.RECTANGLE:
      currentToolManager = rectangleManager;
      break;
    case TOOLS.ARROW:
      currentToolManager = arrowManager;
      break;
  }

  return { currentToolManager, isPaintingRef, currentShapeIdRef };
};
