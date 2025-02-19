import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ProductQuery } from './product.query';

@ApiTags('Товары')
@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Создание нового товара' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка товаров' })
  findAll(@Query() query: ProductQuery) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение детальной информации по товару' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование товара' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление товара' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
