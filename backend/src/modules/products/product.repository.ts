import { Injectable } from "@nestjs/common";
import { BasePostgresRepository } from "src/core/data-access/repository/base-postgres.repository";
import { ProductEntity } from "./product.entity";
import { Product } from "src/core/types/product/product.interface";
import { ProductFactory } from "./product.factory";
import { PrismaClientService } from "prisma/prisma-client.service";

@Injectable()
export class ProductRepository extends BasePostgresRepository<ProductEntity, Product> {
  constructor(
    entityFactory: ProductFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: ProductEntity): Promise<void> {
    const data = entity.toPOJO();
    const document = await this.client.product.create({ data });
    entity.id = document.id;
  }
}