import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '@/shared/libs';

import { buttonVariants, type ButtonVariants } from './button-variants';

interface ButtonProps extends React.ComponentProps<'button'>, ButtonVariants {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button };
