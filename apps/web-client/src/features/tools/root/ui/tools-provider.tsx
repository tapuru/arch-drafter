import React, { useRef } from 'react';
import { useTools } from '../model/use-tool-handlers';
import type { Stage } from 'konva/lib/Stage';

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

  const { handleToolsPointerDown, handleToolsPointerMove, handleToolsPointerUp } = useTools({
    stage: stageRef.current,
  });

  return renderBoard({
    onPointerDown: handleToolsPointerDown,
    onPointerUp: handleToolsPointerUp,
    onPointerMove: handleToolsPointerMove,
    stageRef,
  });
};
