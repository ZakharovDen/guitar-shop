import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FileUploaderService } from "./file-uploader.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileUploaderController } from "./file-uploader.controller";

@Module({
  imports: [
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: 'C:\\projects\\guitar-shop\\backend\\uploads',
      serveRoot: '/static'
    }),
  ],
  providers: [FileUploaderService],
  exports: [FileUploaderService],
  controllers: [FileUploaderController],
})
export class FileUploaderModule { }