import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductFactory } from './product.factory';
import { ProductRepository } from './product.repository';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';

@Module({
  imports: [FileUploaderModule],
  controllers: [ProductController],
  providers: [ProductService, ProductFactory, ProductRepository],
})
export class ProductModule { }
