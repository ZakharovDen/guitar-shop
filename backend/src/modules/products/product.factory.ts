import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/core/interfaces/entity-factory.interface";
import { ProductEntity } from "./product.entity";
import { Product } from "src/core/types/product/product.interface";

@Injectable()
export class ProductFactory implements EntityFactory<ProductEntity> {
  public create(entityPlainData: Product): ProductEntity {
    return new ProductEntity(entityPlainData);
  }
}