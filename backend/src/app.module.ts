import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/products/product.module';
import { FileUploaderModule } from './modules/file-uploader/file-uploader.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './config/config';
import { CliModule } from './cli/cli.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    FileUploaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfig]
    }),
    CliModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
