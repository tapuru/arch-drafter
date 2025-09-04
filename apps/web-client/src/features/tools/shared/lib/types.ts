import type { Tool, TOOLS } from './tools.const';
import type { Vector2d } from 'konva/lib/types';

//TODO: make a full AppShape type in model package with zod
export type AppShape = {
  id: string;
  x?: number;
  y?: number;
};

export type ToolManager<TName extends Tool> = TName extends typeof TOOLS.SELECT
  ? { name: TName }
  : {
      initShape: (pos: Vector2d) => string;
      extendShape: (pos: Vector2d) => void;
      finishShape: (cb: (shape: AppShape) => void) => void;
      name: TName;
    };
