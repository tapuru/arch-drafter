import { ArrowToolButton } from '../../arrow';
import { RectangleToolButton } from '../../rectangle';
import { ScribbleToolButton } from '../../scribble';
import { SelectToolButton } from '../../select';
import { LoadExampleButton } from './load-example-button';
import { SaveButton } from './save-button';

export const ToolBar = () => {
  return (
    <div className="flex justify-center items-center gap-3 py-2 px-3 w-fit mx-auto border shadow-lg rounded-lg">
      <SaveButton />
      <SelectToolButton />
      {/* <Button onClick={handleExport} variant="outline" className={clsx('p-1 rounded')}> */}
      {/*   Export */}
      {/* </Button> */}
      <RectangleToolButton />
      <ScribbleToolButton />
      <ArrowToolButton />
      <LoadExampleButton />
    </div>
  );
};
