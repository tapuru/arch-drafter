import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';

import { useRef } from 'react';

import { TOOLS, useSelectCurrentTool, type AppShape } from '@/features/tools/shared';

export const useShapeHandlers = () => {
  const transformerRef = useRef<any>(null);

  const currentTool = useSelectCurrentTool();

  const handleShapeClick = (shape: AppShape) => (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => {
    if (currentTool !== TOOLS.SELECT || !transformerRef.current) return;

    const target = e.currentTarget;
    transformerRef.current.nodes([target]);

    console.log('SELECTED SHAPE:');
    console.log(shape);
  };

  return { handleShapeClick };
};
