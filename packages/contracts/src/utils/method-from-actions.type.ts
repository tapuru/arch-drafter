export type MethodFromAction<
  T extends keyof TActions,
  TActions extends Record<string, { request: any; response: any }>,
> = (data: TActions[T]['request']) => Promise<TActions[T]['response']>;
