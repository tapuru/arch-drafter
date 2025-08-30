import { ToolButton, TOOLS, useSelectCurrentTool, useToolsActions } from '@/features/tools/shared';

export const RectangleToolButton = () => {
  const { setCurrentTool } = useToolsActions();
  const currentTool = useSelectCurrentTool();

  return (
    <ToolButton isActive={currentTool === TOOLS.RECTANGLE} onClick={() => setCurrentTool(TOOLS.RECTANGLE)}>
      Rectangle
    </ToolButton>
  );
};
