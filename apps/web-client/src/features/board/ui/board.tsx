import { type Stage as StageType } from 'konva/lib/Stage';
import type React from 'react';
import { Layer, Rect, Stage } from 'react-konva';

export const Board = ({
  onBgClick,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  stageRef,
  shapes,
}: {
  onBgClick: () => void;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerMove: () => void;
  stageRef: React.RefObject<StageType | null>;
  shapes: React.ReactNode;
}) => {
  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          height={window.innerHeight}
          width={window.innerWidth}
          fill="#ffffff"
          id="bg"
          onClick={onBgClick}
        />
        {shapes}
      </Layer>
    </Stage>
  );
};
