import { ApiError } from '@bc-arch-drafter/contracts';
import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class AppHttpException extends HttpException {
  constructor(error: ApiError[] | string, status: number, options?: HttpExceptionOptions) {
    let errors: ApiError[];
    errors = typeof error === 'string' ? [{ field: null, message: error }] : error;
    super({ success: false, errors }, status, options);
  }
}
