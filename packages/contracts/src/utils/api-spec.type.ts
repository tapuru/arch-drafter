export type ApiSpec<
  TActions extends Record<string, string>,
  TContracts extends Record<TActions[keyof TActions], { request: any; response: any }>,
> = TContracts;
