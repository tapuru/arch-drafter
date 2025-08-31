import { Button } from '@bc-arch-drafter/ui';
import { RectangleToolButton } from '../../rectangle';
import { LoadExampleButton } from './load-example-button';
import { SaveButton } from './save-button';
import { ArrowToolButton } from '../../arrow';

export const ToolBar = () => {
  return (
    <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
      <SaveButton />
      {/* <Button onClick={handleExport} variant="outline" className={clsx('p-1 rounded')}> */}
      {/*   Export */}
      {/* </Button> */}
      <RectangleToolButton />
      <ArrowToolButton />
      <LoadExampleButton />
    </div>
  );
};
