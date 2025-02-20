import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('application.jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('application.jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    }
  }
}