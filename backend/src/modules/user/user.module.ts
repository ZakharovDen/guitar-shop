import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClientModule } from 'prisma/prisma-client.module';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { MailModule } from '../mail-module/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from 'src/helpers/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserFactory,
    JwtAccessStrategy,
  ],
  imports: [
    PrismaClientModule,
    MailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ]
})
export class UserModule { }
