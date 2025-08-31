export const TOOLS = {
  SELECT: 'SELECT',
  RECTANGLE: 'RECTANGLE',
  ARROW: 'ARROW',
};

export type Tool = (typeof TOOLS)[keyof typeof TOOLS];
