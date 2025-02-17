import { Injectable, NotFoundException } from "@nestjs/common";
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

  public async update(entity: ProductEntity): Promise<void> {
    const data = entity.toPOJO();
    await this.client.product.update({ data, where: { id: data.id } });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.product.delete({ where: { id } });
  }

  public async findById(id: string): Promise<ProductEntity | null> {
    const document = await this.client.product.findUnique({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Product with id = ${id} not found.`);
    }
    return this.createEntityFromDocument(document);
  }

  public async findAll(): Promise<(ProductEntity | null)[]> {
    const documents = await this.client.product.findMany();
    return documents.map((document) => this.createEntityFromDocument(document));
  }
}