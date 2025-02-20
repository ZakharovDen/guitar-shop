import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUploaderService } from "./file-uploader.service";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return [{
          rootPath: configService.get<string>('application.fileUploader.rootPath'),
          serveRoot: configService.get<string>('application.fileUploader.serveRoot'),
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
  ],
  providers: [FileUploaderService],
  exports: [FileUploaderService],
})
export class FileUploaderModule { }