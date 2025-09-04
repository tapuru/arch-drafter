import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { TOOLS, type Tool } from '../lib/tools.const';

type Actions = {
  setCurrentTool: (tool: Tool) => void;
};

type State = {
  currentTool: Tool;
  actions: Actions;
};

const useToolsStore = create<State>()(
  immer((set) => ({
    currentTool: TOOLS.SELECT,
    actions: {
      setCurrentTool: (tool) =>
        set((state) => {
          state.currentTool = tool;
        }),
    },
  })),
);

export const useToolsActions = () => useToolsStore((state) => state.actions);
export const useSelectCurrentTool = () => useToolsStore((state) => state.currentTool);
