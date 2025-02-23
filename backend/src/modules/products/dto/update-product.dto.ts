import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ProductFieldDescription } from '../product.constant';
import { IsUUID } from 'class-validator';

export class UpdateProductDto extends CreateProductDto {
  @ApiProperty(ProductFieldDescription.Id)
  @IsUUID()
  public id: string;
}
