import type { Tool } from './tools.const';
import type { ToolManager } from './types';

export const createToolManagerHook = <TName extends Tool>(
  hook: (currentShapeId: string | null) => ToolManager<TName>,
) => hook;
