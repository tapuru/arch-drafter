import { isApiErrorResponse } from '@bc-arch-drafter/contracts';
import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

import { AppHttpException } from './app-http-exception';

export class RpcExceptionsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof AppHttpException) {
          return throwError(() => err);
        }

        if (isApiErrorResponse(err)) {
          return throwError(() => new AppHttpException(err.errors, err.status ?? HttpStatus.BAD_REQUEST));
        }

        return throwError(
          () =>
            new AppHttpException([{ message: 'Internal server error', field: null }], HttpStatus.INTERNAL_SERVER_ERROR),
        );
      }),
    );
  }
}
