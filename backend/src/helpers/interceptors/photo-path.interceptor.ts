import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { ProductRdo } from "src/modules/products/rdo/product-rdo";
import { map } from 'rxjs/operators';
import { ProductWithPaginationRdo } from "src/modules/products/rdo/product-with-pagination.rdo";

@Injectable()
export class FilePathInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const host = this.configService.get<string>('HOST') || 'localhost';
    const port = this.configService.get<number>('PORT');
    const serveRoot = this.configService.get<number>('SERVE_ROOT');
    console.log(host, port)
    const protocol = this.configService.get<string>('PROTOCOL') || 'http';

    const baseUrl = `${protocol}://${host}:${port}`;


    return next.handle().pipe(
      map((data: ProductRdo | ProductRdo[] | ProductWithPaginationRdo) => {
        if (!data) {
          return data;
        }

        if (typeof data === 'object' && data !== null && 'photoPath' in data) {
          const fileEntity = data as ProductRdo;
          fileEntity.photoPath = `${baseUrl}${serveRoot}/${fileEntity.photoPath}`;
          return fileEntity;
        }

        if (Array.isArray(data)) {
          return data.map(item => {
            if (typeof item === 'object' && item !== null && 'photoPath' in item) {
              const fileEntity = item as ProductRdo;
              fileEntity.photoPath = `${baseUrl}${serveRoot}/${fileEntity.photoPath}`;
              return fileEntity;
            }
            return item;
          });
        }

        if (typeof data === 'object' && data !== null && 'entities' in data) {
          const fileEntity = data as ProductWithPaginationRdo;
          return {
            ...fileEntity,
            entities: fileEntity.entities.map((item) => ({
              ...item,
              photoPath: `${baseUrl}${serveRoot}/${item.photoPath}`
            }))
          };
        }
        return data;
      }),
    );
  }
}