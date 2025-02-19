import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/products/product.module';
import { FileUploaderModule } from './modules/file-uploader/file-uploader.module';

@Module({
  imports: [UserModule, ProductModule, FileUploaderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
