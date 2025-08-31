export const TOOLS = {
  SELECT: 'SELECT',
  RECTANGLE: 'RECTANGLE',
  SCRIBBLE: 'SCRIBBLE',
  ARROW: 'ARROW',
} as const;

export type Tool = (typeof TOOLS)[keyof typeof TOOLS];
