import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) { }

  public async create(dto: CreateProductDto) {
    const productEntity = new ProductEntity(dto);
    await this.productRepository.save(productEntity);
    return productEntity;
  }

  public async findAll() {
    return `This action returns all products`;
  }

  public async findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  public async update(id: string, dto: UpdateProductDto) {
    const productEntity = new ProductEntity({ ...dto, id });
    await this.productRepository.update(productEntity);
    return productEntity;
  }

  public async remove(id: string) {
    return await this.productRepository.deleteById(id);
  }
}
