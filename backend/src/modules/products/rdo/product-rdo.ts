import { ApiProperty } from "@nestjs/swagger";
import { ProductFieldDescription } from "../product.constant";
import { GuitarType } from "src/core/types/product/guitar-type";
import { GuitarStringsCount } from "src/core/types/product/guitar-strings-count";
import { Expose } from "class-transformer";

export class ProductRdo {
  @ApiProperty(ProductFieldDescription.Id)
  @Expose()
  id: string;

  @ApiProperty(ProductFieldDescription.Title)
  @Expose()
  title: string;

  @ApiProperty(ProductFieldDescription.Description)
  @Expose()
  description: string;

  @ApiProperty(ProductFieldDescription.CreatedAt)
  @Expose()
  createdAt: Date;

  @ApiProperty(ProductFieldDescription.PhotoPath)
  @Expose()
  photoPath: string;

  @ApiProperty(ProductFieldDescription.Type)
  @Expose()
  type: GuitarType;

  @ApiProperty(ProductFieldDescription.Article)
  @Expose()
  article: string;

  @ApiProperty(ProductFieldDescription.StringsCount)
  @Expose()
  stringsCount: GuitarStringsCount;

  @ApiProperty(ProductFieldDescription.Price)
  @Expose()
  price: number;
}
