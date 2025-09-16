import { applyDecorators, UseInterceptors, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs/operators';

export const CACHE_CONTROL_KEY = 'cache-control';

export function CacheControl(maxAge: number) {
  return applyDecorators(
    UseInterceptors({
      intercept(context: ExecutionContext, next: CallHandler) {
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
          map((data) => {
            response.setHeader('Cache-Control', `max-age=${maxAge}`);
            return data;
          }),
        );
        return next.handle();
      },
    }),
  );
}