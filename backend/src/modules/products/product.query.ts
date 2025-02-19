import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_ITEM_COUNT_LIMIT, DEFAULT_SORT_DIRECTION, DEFAULT_PAGE_COUNT, SortField, DEFAULT_SORT_FIELD, SortDirection } from './product.constant';
import { GuitarType } from 'src/core/types/product/guitar-type';
import { GuitarStringsCount } from 'src/core/types/product/guitar-strings-count';


export class ProductQuery {
  @ApiProperty({ description: 'Количество записей на странице', required: false })
  @Transform(({ value }) => +value || DEFAULT_ITEM_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  readonly limit?: number = DEFAULT_ITEM_COUNT_LIMIT;

  @ApiProperty({ description: 'Поле для сортировки', enum: SortField, required: false })
  @IsEnum(SortField)
  @IsOptional()
  public sortField?: SortField = DEFAULT_SORT_FIELD;

  @ApiProperty({ description: 'Направление сортировки', enum: SortDirection, required: false })
  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({ description: 'Номер страницы', required: false })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page?: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({ description: 'Тип гитар', required: false, enum: GuitarType })
  @IsIn(Object.values(GuitarType), { each: true })
  @IsOptional()
  public guitarType?: GuitarType[];

  @ApiProperty({ description: 'Количество струн', enum: GuitarStringsCount, required: false })
  @Transform(({ value }) => +value)
  @IsIn(Object.values(GuitarStringsCount), { each: true })
  @IsOptional()
  public guitarStringsCount?: GuitarStringsCount[];
}