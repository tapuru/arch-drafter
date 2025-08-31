export const TOOLS = {
  SELECT: 'SELECT',
  RECTANGLE: 'RECTANGLE',
  ARROW: 'ARROW',
} as const;

export type Tool = (typeof TOOLS)[keyof typeof TOOLS];
