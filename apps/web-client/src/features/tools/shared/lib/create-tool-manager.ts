import type { ToolManager } from './types';

export const createToolManagerHook = (hook: (currentShapeId: string | null) => ToolManager) => hook;
