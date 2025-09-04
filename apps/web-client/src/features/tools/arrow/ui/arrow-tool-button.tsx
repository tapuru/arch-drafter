import { ToolButton, TOOLS, useSelectCurrentTool, useToolsActions } from '../../shared';

export const ArrowToolButton = () => {
  const currentTool = useSelectCurrentTool();
  const { setCurrentTool } = useToolsActions();

  return (
    <ToolButton onClick={() => setCurrentTool(TOOLS.ARROW)} isActive={currentTool === TOOLS.ARROW}>
      Arrow
    </ToolButton>
  );
};
