import { Entity } from "src/core/base/entity";
import { StorableEntity } from "src/core/interfaces/storable-entity.interface";
import { AuthUser } from "src/core/types/user/auth-user.interface";
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from "./user.constant";

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public name: string;
  public email: string;
  public passwordHash: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
  }

  toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
