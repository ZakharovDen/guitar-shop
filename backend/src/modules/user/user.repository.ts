import { Injectable } from "@nestjs/common";
import { BasePostgresRepository } from "src/core/data-access/repository/base-postgres.repository";
import { UserEntity } from "./entities/user.entity";
import { AuthUser } from "src/core/types/user/auth-user.interface";
import { UserFactory } from "./user.factory";
import { PrismaClientService } from "prisma/prisma-client.service";

@Injectable()
export class UserRepository extends BasePostgresRepository<UserEntity, AuthUser> {
  constructor(
    entityFactory: UserFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: UserEntity): Promise<void> {
    const data = entity.toPOJO();
    const document = await this.client.user.create({ data });
    entity.id = document.id;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.client.user.findUnique({ where: { email } });
    if (!document) {
      return null;
    }
    return this.createEntityFromDocument(document);
  }

}