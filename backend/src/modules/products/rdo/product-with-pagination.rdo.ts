import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { PaginationRdo } from "src/core/rdo/pagination.rdo";
import { ProductRdo } from "./product-rdo";

export class ProductWithPaginationRdo extends PaginationRdo {
  @Expose()
  @ApiProperty({ description: 'Данные', type: [ProductRdo] })
  @Type(() => ProductRdo)
  public entities: ProductRdo[];
}