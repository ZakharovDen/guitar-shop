import { Injectable } from "@nestjs/common";
import { EntityFactory } from "src/core/interfaces/entity-factory.interface";
import { AuthUser } from "src/core/types/user/auth-user.interface";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: AuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }
}