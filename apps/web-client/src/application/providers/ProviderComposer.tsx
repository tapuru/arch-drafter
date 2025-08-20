import type { FC, PropsWithChildren } from 'react';

type Props = {
  providers: FC<PropsWithChildren>[];
} & PropsWithChildren;

export const ProviderComposer = ({ providers, children }: Props) => {
  let content = children;

  for (const Provider of [...providers].toReversed()) {
    content = <Provider>{content}</Provider>;
  }

  return <>{content}</>;
};
