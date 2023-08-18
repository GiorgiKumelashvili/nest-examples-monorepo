import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//TODO
@Injectable()
export class DtoInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // return next.handle().pipe(tap((d) => instanceToPlain(d)));

        return next.handle().pipe(
            map((data) => {
                return instanceToPlain(data);
            }),
        );
    }
}
