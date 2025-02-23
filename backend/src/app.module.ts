import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/products/product.module';
import { FileUploaderModule } from './modules/file-uploader/file-uploader.module';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './config/config';

@Module({
  imports: [
    UserModule,
    ProductModule,
    FileUploaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [applicationConfig]
    }),
  ],
})
export class AppModule { }
