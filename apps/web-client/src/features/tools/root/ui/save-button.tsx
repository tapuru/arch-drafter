import { ToolButton } from '../../shared';
import { useAutoSaveLoad } from '../model/use-auto-save-load';
import { useSaveShapes } from '../model/use-save-shapes';

export const SaveButton = () => {
  const { handleSave } = useSaveShapes();
  useAutoSaveLoad();

  return (
    <ToolButton onClick={handleSave} variant="outline">
      Save
    </ToolButton>
  );
};
