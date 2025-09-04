import type { Stage } from 'konva/lib/Stage';

import React, { useRef } from 'react';

import { useToolHandlers } from '../model/use-tool-handlers';
import { useToolManagers } from '../model/use-tool-managers';

export const ToolsProvider = ({
  renderBoard,
}: {
  renderBoard: (handlers: {
    onPointerDown: () => void;
    onPointerUp: () => void;
    onPointerMove: () => void;
    stageRef: React.RefObject<Stage | null>;
  }) => React.ReactNode;
}) => {
  //TODO: maybe move this away
  const stageRef = useRef<Stage>(null);

  const { currentToolManager, isPaintingRef, currentShapeIdRef } = useToolManagers();

  const { handleToolsPointerDown, handleToolsPointerMove, handleToolsPointerUp } = useToolHandlers({
    stage: stageRef.current,
    currentShapeIdRef,
    currentToolManager,
    isPaintingRef,
  });

  return renderBoard({
    onPointerDown: handleToolsPointerDown,
    onPointerUp: handleToolsPointerUp,
    onPointerMove: handleToolsPointerMove,
    stageRef,
  });
};
