import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const responseClass = this.reflector.get<Type<any>>(
      'responseClass',
      handler,
    );

    return next.handle().pipe(
      map((data) => {
        if (responseClass) {
          return plainToInstance(responseClass, data);
        }
        return data;
      }),
    );
  }
}
