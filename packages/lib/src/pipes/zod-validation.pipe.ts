import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import z from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private exceptionFactory: (payload: any) => unknown;

  constructor(
    private schema: z.ZodTypeAny,
    exceptionFactory?: (payload: any) => unknown,
  ) {
    this.exceptionFactory = exceptionFactory ?? ((payload: any) => new BadRequestException(payload));
  }

  transform(value: unknown) {
    const parsed = this.schema.safeParse(value);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => ({
        field: i.path.length > 0 ? i.path.join('.') : null,
        message: i.message,
      }));

      throw this.exceptionFactory({ success: false, errors });
    }

    return parsed.data;
  }
}
