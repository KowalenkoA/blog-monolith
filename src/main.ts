import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/common/http-exception.filter';
import { LoggerPort } from './modules/logger/logger.port';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './modules/jwt/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtConfig } from './modules/jwt/jwt.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get<LoggerPort>('LOGGER_SERVICE');
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP__HTTP_PORT');

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });


  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));

  app.useGlobalGuards(new JwtAuthGuard(app.get(JwtService), app.get(JwtConfig), app.get(Reflector)));
  
  await app.listen(port);
}
bootstrap();
