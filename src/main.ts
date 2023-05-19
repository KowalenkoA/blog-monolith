import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './modules/common/http-exception.filter';
import { LoggerPort } from './modules/logger/logger.port';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get<LoggerPort>('LOGGER_SERVICE');
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP__HTTP_PORT');

  app.useGlobalFilters(new HttpExceptionFilter(loggerService));
  
  await app.listen(port);
}
bootstrap();
