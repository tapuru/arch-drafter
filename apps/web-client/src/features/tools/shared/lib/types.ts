import type { Vector2d } from 'konva/lib/types';
import type { Tool } from './tools.const';

//TODO: make a full AppShape type in model package with zod
export type AppShape = {
  id: string;
  x?: number;
  y?: number;
};

export type ToolManager = {
  initShape: (pos: Vector2d) => string;
  extendShape: (pos: Vector2d) => void;
  finishShape: (cb: (shape: AppShape) => void) => void;
  name: Tool;
};
