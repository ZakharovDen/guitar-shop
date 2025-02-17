import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClientModule } from 'prisma/prisma-client.module';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFactory],
  imports: [PrismaClientModule]
})
export class UserModule { }
