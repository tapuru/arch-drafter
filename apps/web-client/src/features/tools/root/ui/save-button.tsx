import { ToolButton } from '../../shared';
import { useSaveShapes } from '../model/use-save-shapes';

export const SaveButton = () => {
  const { handleSave } = useSaveShapes();

  return (
    <ToolButton onClick={handleSave} variant="outline">
      Save
    </ToolButton>
  );
};
