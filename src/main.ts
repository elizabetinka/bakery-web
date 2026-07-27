import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { engine } from 'express-handlebars';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TimeInterceptor } from './interceptors/time.interceptor';

async function bootstrap() {
  //const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      defaultLayout: 'main',
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      helpers: {
        eq: (a, b) => a === b,
      },
    }),
  );
  app.setViewEngine('hbs');

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true, // Удаляет поля, не описанные в DTO
      // transform: true, // Автоматическое преобразование типов
      disableErrorMessages: false, // Показывать ошибки валидации
      transformOptions: {
        enableImplicitConversion: true, // <<< разрешить авто-приведение типов
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TimeInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
}
bootstrap();
