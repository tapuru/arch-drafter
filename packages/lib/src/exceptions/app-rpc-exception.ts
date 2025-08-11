import { ApiError } from '@bc-arch-drafter/contracts';
import { RpcException } from '@nestjs/microservices';

export class AppRpcException extends RpcException {
  constructor(error: ApiError[] | string, status: number) {
    let errors: ApiError[];
    errors = typeof error === 'string' ? [{ field: null, message: error }] : error;
    super({ errors, status, success: false });
  }
}
