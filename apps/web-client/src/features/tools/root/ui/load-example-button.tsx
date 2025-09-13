import { ToolButton } from '@/features/tools/shared';
import { useLoadShapes } from '../model/use-load-shapes';

export const LoadExampleButton = () => {
  const { handleLoadExample } = useLoadShapes();

  return (
    <ToolButton onClick={handleLoadExample} variant="secondary">
      Load example
    </ToolButton>
  );
};
