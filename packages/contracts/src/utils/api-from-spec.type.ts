export type ApiFromSpec<TSpec extends Record<string, { request: any; response: any }>> = {
  [K in keyof TSpec as K extends `${string}.${infer Method}` ? Method : K]: (
    data: TSpec[K]['request'],
  ) => Promise<TSpec[K]['response']>;
};
