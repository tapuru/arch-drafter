import type React from 'react';

import { Button } from '@bc-arch-drafter/ui';
import clsx from 'clsx';

export const ToolButton = ({
  isActive,
  onClick,
  children,
  variant,
}: {
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: Parameters<typeof Button>[0]['variant'];
}) => {
  return (
    <Button className={clsx('p-1 rounded', isActive ? 'bg-cyan-500' : '')} onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
};
