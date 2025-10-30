import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module.js';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';
import { LoggerService } from './common/logger/logger.service.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  app.useLogger(logger);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true }));
  const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [];
  app.enableCors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    credentials: true,
  });
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('http.port', 3000);
  await app.listen(port);
  logger.log(`API listening on port ${port}`);
}

bootstrap();
