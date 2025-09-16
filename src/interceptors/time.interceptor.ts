import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime.bigint();

    const isGraphQL = context.getType<string>() === 'graphql';

    let httpResponse: Response | null = null;
    let gqlContext: GqlExecutionContext | null = null;

    if (isGraphQL) {
      gqlContext = GqlExecutionContext.create(context);
    } else {
      httpResponse = context.switchToHttp().getResponse<Response>();
    }

    return next.handle().pipe(
      tap(() => {
        // Calculate elapsed time in milliseconds
        const end = process.hrtime.bigint();
        const elapsedTime = Number(end - start) / 1_000_000; // Convert nanoseconds to milliseconds

        // Log the request time
        let method = 'UNKNOWN';
        let url = 'unknown';

        if (isGraphQL && gqlContext) {
          const ctx = gqlContext.getContext();
          method = 'GraphQL';
          url = gqlContext.getInfo()?.fieldName || 'unknown';
        } else {
          const request = context.switchToHttp().getRequest();
          method = request?.method || 'UNKNOWN';
          url = request?.url || 'unknown';
        }

        console.log(
          `Request ${method} ${url} took ${elapsedTime.toFixed(2)}ms`,
        );
      }),
      map(data => {
        // Calculate elapsed time again for response modification
        const end = process.hrtime.bigint();
        const elapsedTime = Number(end - start) / 1_000_000;

        if (httpResponse) {
          httpResponse.setHeader('X-Elapsed-Time', elapsedTime.toFixed(2));
        }


        if (isGraphQL && gqlContext) {
          const res = gqlContext.getContext().res;
          if (res) {
            res.setHeader('X-Elapsed-Time', elapsedTime.toFixed(2));
          }
        }


        if (!isGraphQL && data && typeof data === 'object') {
          return {
            ...data,
            serverTime: elapsedTime.toFixed(2),
          };
        }

        return data;
      }),
    );
  }
}