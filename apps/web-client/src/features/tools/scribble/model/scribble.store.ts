import type { LineConfig } from 'konva/lib/shapes/Line';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { DEFAULT_SCRIBBLE_CONFIG } from '../lib/defaults.const';

//TODO: create model schemas for this (dont use konva types)
export type Scribble = Required<Pick<LineConfig, 'id'>> &
  Pick<LineConfig, 'points' | 'fill' | 'lineCap' | 'lineJoin' | 'strokeWidth' | 'strokeColor'>;

type Actions = {
  setScribbles: (scribbles: Array<Scribble>) => void;
  addScribble: (scribble: Pick<Scribble, 'id' | 'points'>) => void;
  updateScribble: (id: string, cb: (prev: Scribble) => Scribble) => void;
  removeScribble: (id: string) => void;
  clearScribbles: () => void;
};

type State = {
  scribbles: Array<Scribble>;
  actions: Actions;
  settings: {
    strokeColor: string;
    fill: string;
  };
};

const useScribblesStore = create<State>()(
  immer((set) => ({
    scribbles: [],
    settings: {
      strokeColor: DEFAULT_SCRIBBLE_CONFIG.STROKE_COLOR,
      fill: DEFAULT_SCRIBBLE_CONFIG.FILL,
    },
    actions: {
      setScribbles: (scribbles) =>
        set((state) => {
          state.scribbles = scribbles;
        }),
      addScribble: (s) =>
        set((state) => {
          const { fill, strokeColor } = state.settings;
          state.scribbles.push({ ...s, strokeColor, fill });
        }),
      updateScribble: (id, cb) =>
        set((state) => {
          state.scribbles = state.scribbles.map((s) => {
            if (s.id === id) {
              return cb({ ...s });
            }
            return s;
          });
        }),
      removeScribble: (id) =>
        set((state) => {
          state.scribbles = state.scribbles.filter((r) => r.id !== id);
        }),
      clearScribbles: () =>
        set((state) => {
          state.scribbles = [];
        }),
    },
  })),
);

export const useScribblesActions = () => useScribblesStore((state) => state.actions);
export const useSelectScribbles = () => useScribblesStore((state) => state.scribbles);
export const useSelectScribbleById = (id: string | null) =>
  useScribblesStore((state) => state.scribbles.find((r) => r.id === id));
