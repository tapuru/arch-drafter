export type ServiceFromActions<
  TActions extends Record<string, string>,
  TImpl extends {
    [K in TActions[keyof TActions]]: (...args: any) => any;
  },
> = {
  [K in keyof TImpl as K extends `${string}.${infer Method}` ? Method : K]: TImpl[K];
};
