import 'express';

declare module 'express' {
  interface Request {
    user?: User;
    tokenUuid?: TokenUuid;
  }
}
