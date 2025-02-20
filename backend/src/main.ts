import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'api';
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('The «Guitar Shop» application')
    .setDescription('REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }));

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  await app.listen(port);
}
bootstrap();
