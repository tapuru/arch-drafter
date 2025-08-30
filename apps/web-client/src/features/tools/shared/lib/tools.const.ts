export const TOOLS = {
  SELECT: 'SELECT',
  RECTANGLE: 'RECTANGLE',
};

export type Tool = (typeof TOOLS)[keyof typeof TOOLS];
