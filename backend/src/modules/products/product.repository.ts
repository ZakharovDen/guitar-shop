import { Injectable, NotFoundException } from "@nestjs/common";
import { BasePostgresRepository } from "src/core/data-access/repository/base-postgres.repository";
import { ProductEntity } from "./product.entity";
import { Product } from "src/core/types/product/product.interface";
import { ProductFactory } from "./product.factory";
import { PrismaClientService } from "prisma/prisma-client.service";
import { ProductQuery } from "./product.query";
import { Prisma } from "@prisma/client";
import { SortField } from "./product.constant";
import { PaginationResult } from "src/core/interfaces/pagination.interface";

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

  public async findAll(query?: ProductQuery): Promise<PaginationResult<ProductEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit ? query?.limit : undefined;
    const where: Prisma.ProductWhereInput = {};
    let orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (query.sortField === SortField.CreateDate) {
      orderBy = { createdAt: query.sortDirection };
    }
    if (query.sortField === SortField.Price) {
      orderBy = { price: query.sortDirection };
    }

    if (query?.guitarType) {
      if (typeof query.guitarType === 'string') {
        where.type = {
          equals: query.guitarType
        }
      } else {
        where.type = {
          in: query.guitarType
        }
      }
    }
    if (query?.guitarStringsCount) {
      if (typeof query.guitarStringsCount === 'number') {
        where.stringsCount = {
          equals: query.guitarStringsCount
        }
      } else {
        where.stringsCount = {
          in: query.guitarStringsCount
        }
      }
    }
    const [documents, documentsCount] = await Promise.all([
      this.client.product.findMany({ where, orderBy, skip, take }),
      this.client.product.count({ where }),
    ]);

    return {
      currentPage: query?.page,
      totalPages: Math.ceil(documentsCount / take),
      itemsPerPage: take,
      totalItems: documentsCount,
      entities: documents.map((document) => this.createEntityFromDocument(document)),
    }
  }
}