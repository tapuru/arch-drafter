import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { Vector2d } from 'konva/lib/types';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

//TODO: create model schemas for this (dont use konva types)
export type Rectangle = Pick<RectConfig, 'height' | 'width' | 'fill' | 'strokeColor' | 'strokeWidth'> &
  Required<Pick<RectConfig, 'x' | 'y' | 'id'>>;

type RectanglesActions = {
  setRectangles: (rects: Array<Rectangle>) => void;
  addRectangle: (rect: Rectangle) => void;
  updateRectangle: (data: Pick<Rectangle, 'id'> & { pos: Vector2d }) => void;
  removeRectangle: (id: string) => void;
  clearRectangles: () => void;
};

type RectanglesState = {
  rectangles: Array<Rectangle>;
  actions: RectanglesActions;
};

const useRectanglesStore = create<RectanglesState>()(
  immer((set) => ({
    rectangles: [],
    actions: {
      setRectangles: (rects) =>
        set((state) => {
          state.rectangles = rects;
        }),
      addRectangle: (rect) =>
        set((state) => {
          state.rectangles.push(rect);
        }),
      updateRectangle: ({ id, pos }) =>
        set((state) => {
          state.rectangles = state.rectangles.map((r) => {
            if (r.id === id) {
              return { ...r, width: pos.x - r.x, height: pos.y - r.y };
            }
            return r;
          });
        }),
      removeRectangle: (id) =>
        set((state) => {
          state.rectangles = state.rectangles.filter((r) => r.id !== id);
        }),
      clearRectangles: () =>
        set((state) => {
          state.rectangles = [];
        }),
    },
  })),
);

export const useRectanglesActions = () => useRectanglesStore((state) => state.actions);
export const useSelectRectangles = () => useRectanglesStore((state) => state.rectangles);
export const useSelectRectangleById = (id: string | null) =>
  useRectanglesStore((state) => state.rectangles.find((r) => r.id === id));
