import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { createHash } from 'crypto';

@Injectable()
export class ETagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();

    const ifNoneMatch = request.get('If-None-Match');

    return next.handle().pipe(
      map(data => {

        if (request.method !== 'GET' || !data) {
          return data;
        }

        // Генерируем ETag на основе данных ответа
        const hash = createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex');
        const etag = `"${hash}"`;

        response.setHeader('ETag', etag);

        // Если If-None-Match совпадает с ETag, возвращаем 304 Not Modified
        if (ifNoneMatch && ifNoneMatch === etag) {
          response.status(304);
          return of(undefined); // Данные не отправляются для 304
        }

        return data;
      }),
    );
  }
}