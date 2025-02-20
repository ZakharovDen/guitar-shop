import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { TokenPayload } from "src/core/interfaces/token-payload.interface";
import { User } from "src/core/types/user/user.interface";

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('application.jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('application.jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}