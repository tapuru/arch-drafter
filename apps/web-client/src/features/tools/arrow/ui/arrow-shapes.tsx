import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

import { Arrow } from 'react-konva';

import { useSelectArrows } from '../model/arrow.store';

export const ArrowShapes = ({
  onClick,
  draggable,
}: {
  draggable?: boolean;
  onClick: (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void;
}) => {
  const arrows = useSelectArrows();

  return arrows.map((a) => (
    <Arrow
      // x={a.x}
      // y={a.y}
      stroke={a.strokeColor}
      key={a.id}
      strokeWidth={2}
      fill={a.fill}
      points={a.points}
      draggable={draggable}
      onClick={(e) => onClick(e)}
    />
  ));
};
