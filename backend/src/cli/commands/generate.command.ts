import { PrismaClient } from '@prisma/client';
import { ProductGenerator } from '../product-generator';
import { Command } from './command.interface.js';
import { getUsers } from 'src/helpers/mocks/user';
import { UserEntity } from 'src/modules/user/user.entity';

export class GenerateCommand implements Command {

  private async seedDb(prismaClient: PrismaClient, count: number) {
    const productGenerator = new ProductGenerator();
    const mockUsers = getUsers();
    for (const user of mockUsers) {
      const userEntity = await new UserEntity({
        email: user.email,
        name: user.name,
        passwordHash: ''
      }).setPassword(user.password);

      await prismaClient.user.upsert({
        where: { email: user.email },
        update: {},
        create: userEntity
      })
    }

    await prismaClient.product.deleteMany();
    for (let i = 0; i < count; i++) {
      const product = productGenerator.generate();
      await prismaClient.product.create({ data: product });
    }

    console.info('🤘️ Database was filled');
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count] = parameters;
    const productCount = Number.parseInt(count, 10);

    const prismaClient = new PrismaClient();

    try {
      await this.seedDb(prismaClient, productCount);
      globalThis.process.exit(0);
    } catch (error) {
      console.error('Can\'t generate data');
      console.error(error.message);
      globalThis.process.exit(1);
    }
    finally {
      await prismaClient.$disconnect();
    }
  }
}
