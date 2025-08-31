import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

import { Rect } from 'react-konva';

import { useSelectRectangles, type Rectangle } from '../model/rectangle.store';

export const RectangleShapes = ({
  draggable,
  onClick,
}: {
  draggable?: boolean;
  onClick: (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void;
}) => {
  const rectangles = useSelectRectangles();

  return rectangles.map((r) => (
    <Rect
      x={r.x}
      y={r.y}
      stroke={r.strokeColor}
      key={r.id}
      strokeWidth={r.strokeWidth}
      fill={r.fill}
      height={r.height}
      width={r.width}
      draggable={draggable}
      onClick={(e) => onClick(e)}
    />
  ));
};
