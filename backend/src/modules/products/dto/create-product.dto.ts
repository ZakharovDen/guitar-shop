import { ApiProperty } from "@nestjs/swagger";
import { ProductFieldDescription, ProductValidateMessage, ProductValidateValue } from "../product.constant";
import { IsDateString, IsEnum, IsNotEmpty, IsString, Length, Max, Min } from "class-validator";
import { GuitarType } from "src/core/types/product/guitar-type";
import { GuitarStringsCount } from "src/core/types/product/guitar-strings-count";

export class CreateProductDto {
  @ApiProperty(ProductFieldDescription.Title)
  @Length(ProductValidateValue.Title.MinLength, ProductValidateValue.Title.MaxLength, { message: ProductValidateMessage.Title })
  title: string;

  @ApiProperty(ProductFieldDescription.Description)
  @Length(ProductValidateValue.Description.MinLength, ProductValidateValue.Description.MaxLength, { message: ProductValidateMessage.Description })
  description: string;

  @ApiProperty(ProductFieldDescription.CreatedAt)
  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty(ProductFieldDescription.PhotoPath)
  @IsString()
  @IsNotEmpty()
  photoPath: string;

  @ApiProperty(ProductFieldDescription.Type)
  @IsEnum(GuitarType)
  @IsNotEmpty()
  type: GuitarType;

  @ApiProperty(ProductFieldDescription.Article)
  @Length(ProductValidateValue.Article.MinLength, ProductValidateValue.Article.MaxLength, { message: ProductValidateMessage.Article })
  article: string;

  @ApiProperty(ProductFieldDescription.StringsCount)
  @IsEnum(GuitarStringsCount)
  @IsNotEmpty()
  stringsCount: GuitarStringsCount;

  @ApiProperty(ProductFieldDescription.Price)
  @Min(ProductValidateValue.Price.Min)
  @Max(ProductValidateValue.Price.Max)
  price: number;
}
