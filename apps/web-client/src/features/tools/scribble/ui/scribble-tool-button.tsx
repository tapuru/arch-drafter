import { ToolButton, TOOLS, useSelectCurrentTool, useToolsActions } from '@/features/tools/shared';

export const ScribbleToolButton = () => {
  const { setCurrentTool } = useToolsActions();
  const currentTool = useSelectCurrentTool();

  return (
    <ToolButton isActive={currentTool === TOOLS.SCRIBBLE} onClick={() => setCurrentTool(TOOLS.SCRIBBLE)}>
      Scribble
    </ToolButton>
  );
};
