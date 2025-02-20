import { TokenPayload } from "src/core/interfaces/token-payload.interface";
import { User } from "src/core/types/user/user.interface";

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}