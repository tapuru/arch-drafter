import type { ArrowConfig } from 'konva/lib/shapes/Arrow';
import type { RectConfig } from 'konva/lib/shapes/Rect';
import type { Vector2d } from 'konva/lib/types';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

//TODO: create model schemas for this (dont use konva types)
export type Arrow = Pick<ArrowConfig, 'fill' | 'strokeWidth' | 'points'> &
  Required<Pick<RectConfig, 'id'>> &
  Partial<Pick<ArrowConfig, 'strokeColor'>>;

type Actions = {
  setArrows: (arrows: Array<Arrow>) => void;
  addArrow: (arrow: Arrow) => void;
  updateArrow: (data: Pick<Arrow, 'id'> & { pos: Vector2d }) => void;
  removeArrow: (id: string) => void;
  clearArrows: () => void;
};

type State = {
  arrows: Array<Arrow>;
  actions: Actions;
};

const useArrowsStore = create<State>()(
  immer((set) => ({
    arrows: [],
    actions: {
      setArrows: (arrows) =>
        set((state) => {
          state.arrows = arrows;
        }),
      addArrow: (rect) =>
        set((state) => {
          state.arrows.push(rect);
        }),
      updateArrow: ({ id, pos }) =>
        set((state) => {
          state.arrows = state.arrows.map((a) => {
            if (a.id === id) {
              return { ...a, points: [a.points[0], a.points[1], pos.x, pos.y] };
            }
            return a;
          });
        }),
      removeArrow: (id) =>
        set((state) => {
          state.arrows = state.arrows.filter((r) => r.id !== id);
        }),
      clearArrows: () =>
        set((state) => {
          state.arrows = [];
        }),
    },
  })),
);

export const useArrowsActions = () => useArrowsStore((state) => state.actions);
export const useSelectArrows = () => useArrowsStore((state) => state.arrows);
export const useSelectArrowById = (id: string | null) =>
  useArrowsStore((state) => state.arrows.find((r) => r.id === id));
