import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

import { Line } from 'react-konva';

import { useSelectScribbles } from '../model/scribble.store';

export const ScribbleShapes = ({
  draggable,
  onClick,
}: {
  draggable?: boolean;
  onClick: (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => void;
}) => {
  const scribbles = useSelectScribbles();

  return scribbles.map((s) => (
    <Line
      stroke={s.strokeColor}
      key={s.id}
      strokeWidth={s.strokeWidth}
      fill={s.fill}
      points={s.points}
      lineCap={s.lineCap}
      lineJoin={s.lineJoin}
      draggable={draggable}
      onClick={(e) => onClick(e)}
    />
  ));
};
