/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable unicorn/switch-case-braces */
/*eslint-disable unicorn/prefer-dom-node-append*/
/*eslint-disable unicorn/prefer-dom-node-remove*/

import type { KonvaEventObject, Node, NodeConfig } from 'konva/lib/Node';
import type { ArrowConfig } from 'konva/lib/shapes/Arrow';
import type { CircleConfig } from 'konva/lib/shapes/Circle';
import type { LineConfig } from 'konva/lib/shapes/Line';
import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { Stage as StageType } from 'konva/lib/Stage';

import { type ChangeEvent, useRef, useState } from 'react';
import { Arrow, Circle, Layer, Line, Rect, Stage, Transformer } from 'react-konva';

import { Button } from '@bc-arch-drafter/ui';
import { clsx } from 'clsx';
import { v4 } from 'uuid';

import json from '../example.json';

const TOOLS = {
  SELECT: 'SELECT',
  ARROW: 'ARROW',
  CIRCLE: 'CIRCLE',
  SCRIBBLE: 'SCRIBBLE',
  RECTANGLE: 'RECTANGLE',
} as const;

const downloadUri = (uri: string, name: string) => {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const BoardExample = () => {
  const stageRef = useRef<StageType>(null);
  const isPainingRef = useRef(false);
  const currentShapeIdRef = useRef<string | null>(null);
  const transformerRef = useRef<any>(null);

  const [currentTool, setCurrentTool] = useState<(typeof TOOLS)[keyof typeof TOOLS]>(TOOLS.SELECT);
  const [fillColor, setFillColor] = useState('#ff0000');

  const [rectangles, setRectangles] = useState<Array<RectConfig & Required<Pick<RectConfig, 'x' | 'y'>>>>([]);
  const [circles, setCircles] = useState<Array<CircleConfig & Required<Pick<CircleConfig, 'x' | 'y'>>>>([]);
  const [arrows, setArrows] = useState<Array<ArrowConfig>>([]);
  const [scribbles, setScribbles] = useState<Array<LineConfig>>([]);

  const isDraggable = currentTool === TOOLS.SELECT;

  const strokeColor = '#000000';

  const handlePointerDown = () => {
    console.log('POINTER DOWN');
    if (currentTool === TOOLS.SELECT || !stageRef.current) return;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const id = v4();

    currentShapeIdRef.current = id;
    isPainingRef.current = true;

    switch (currentTool) {
      case TOOLS.RECTANGLE:
        setRectangles((prev) => [
          ...prev,
          {
            id,
            x: pos.x,
            y: pos.y,
            height: 20,
            width: 20,
            fill: fillColor,
          },
        ]);
        break;
      case TOOLS.CIRCLE:
        setCircles((prev) => [
          ...prev,
          {
            id,
            x: pos.x,
            y: pos.y,
            radius: 20,
            fill: fillColor,
          },
        ]);
        break;
      case TOOLS.ARROW:
        setArrows((prev) => [
          ...prev,
          {
            id,
            points: [pos.x, pos.y, pos.x + 20, pos.y + 20],
            fill: fillColor,
          },
        ]);
        break;
      case TOOLS.SCRIBBLE:
        setScribbles((prev) => [
          ...prev,
          {
            id,
            points: [pos.x, pos.y],
            fill: fillColor,
          },
        ]);
        break;
    }
  };

  const handlePointerMove = () => {
    console.log('POINTER MOVE');
    if (currentTool === TOOLS.SELECT || !stageRef.current || !isPainingRef.current) return;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    switch (currentTool) {
      case TOOLS.RECTANGLE:
        setRectangles((prev) =>
          prev.map((rect) => {
            if (rect.id === currentShapeIdRef.current) {
              return {
                ...rect,
                width: pos.x - rect.x,
                height: pos.y - rect.y,
              };
            }
            return rect;
          }),
        );
        break;
      case TOOLS.CIRCLE:
        setCircles((prev) =>
          prev.map((circle) => {
            if (circle.id === currentShapeIdRef.current) {
              return {
                ...circle,
                radius: ((pos.y - circle.y) ** 2 + (pos.x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          }),
        );
        break;
      case TOOLS.ARROW:
        setArrows((prev) =>
          prev.map((arrow) => {
            if (arrow.id === currentShapeIdRef.current) {
              return {
                ...arrow,
                points: [arrow.points[0], arrow.points[1], pos.x, pos.y],
              };
            }
            return arrow;
          }),
        );
        break;
      case TOOLS.SCRIBBLE:
        setScribbles((prev) =>
          prev.map((scribble) => {
            if (scribble.id === currentShapeIdRef.current) {
              return {
                ...scribble,
                //@ts-ignore
                points: [...scribble.points, pos.x, pos.y],
              };
            }
            return scribble;
          }),
        );
        break;
    }
  };

  const handlePointerUp = () => {
    console.log('POINTER UP');
    isPainingRef.current = false;
  };

  const handleExport = () => {
    if (!stageRef.current) return;
    const uri = stageRef.current.toDataURL();
    downloadUri(uri, 'image.png');
  };

  const handleSave = () => {
    if (!stageRef.current) return;
    const json = JSON.stringify({ rectangles, arrows, scribbles, circles });
    console.log(json);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFillColor(e.target.value);
  };

  const handleElementClick = (e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) => {
    if (currentTool !== TOOLS.SELECT || !transformerRef) return;

    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  const handleLoadExample = () => {
    if (!json || !stageRef.current) return;
    setScribbles(json.scribbles);
    setArrows(json.arrows);
    setRectangles(json.rectangles);
    setCircles(json.circles);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 z-10 w-full py-2 ">
        <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
          <Button onClick={handleSave} variant="outline" className={clsx('p-1 rounded')}>
            Save
          </Button>

          <Button onClick={handleExport} variant="outline" className={clsx('p-1 rounded')}>
            Export
          </Button>
          {Object.values(TOOLS).map((t) => (
            <Button
              className={clsx('p-1 rounded', t === currentTool ? 'bg-cyan-500' : '')}
              onClick={() => setCurrentTool(t)}
            >
              {t}
            </Button>
          ))}
          <div>
            <input type="color" value={fillColor} onChange={handleColorChange} />
          </div>
          <Button onClick={handleLoadExample} variant="secondary" className={clsx('p-1 rounded')}>
            Load example
          </Button>
        </div>
      </div>

      <div id="container">
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#ffffff"
              id="bg"
              onClick={() => transformerRef.current.nodes([])}
            />
            {rectangles.map((rect) => (
              <Rect
                x={rect.x}
                y={rect.y}
                stroke={strokeColor}
                key={rect.id}
                strokeWidth={2}
                fill={rect.fill}
                height={rect.height}
                width={rect.width}
                draggable={isDraggable}
                onClick={handleElementClick}
              />
            ))}
            {circles.map((c) => (
              <Circle
                x={c.x}
                y={c.y}
                stroke={strokeColor}
                key={c.id}
                strokeWidth={2}
                fill={c.fill}
                radius={c.radius}
                draggable={isDraggable}
                onClick={handleElementClick}
              />
            ))}
            {arrows.map((a) => (
              <Arrow
                x={a.x}
                y={a.y}
                stroke={strokeColor}
                key={a.id}
                strokeWidth={2}
                fill={a.fill}
                points={a.points}
                draggable={isDraggable}
                onClick={handleElementClick}
              />
            ))}
            {scribbles.map((s) => (
              <Line
                x={s.x}
                y={s.y}
                stroke={strokeColor}
                key={s.id}
                strokeWidth={2}
                fill={s.fill}
                points={s.points}
                lineCap="round"
                lineJoin="round"
                draggable={isDraggable}
                onClick={handleElementClick}
              />
            ))}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
