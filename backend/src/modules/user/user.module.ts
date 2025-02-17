import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaClientModule } from 'prisma/prisma-client.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaClientModule]
})
export class UserModule { }
