import { ToolButton, TOOLS, useSelectCurrentTool, useToolsActions } from '@/features/tools/shared';

export const SelectToolButton = () => {
  const { setCurrentTool } = useToolsActions();
  const currentTool = useSelectCurrentTool();

  return (
    <ToolButton isActive={currentTool === TOOLS.SELECT} onClick={() => setCurrentTool(TOOLS.SELECT)}>
      Select
    </ToolButton>
  );
};
