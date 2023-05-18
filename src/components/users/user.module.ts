/* eslint-disable import/no-cycle */
import { forwardRef, Module } from '@nestjs/common';
import { PostgreSqlUserAdapter } from './modules/postgreSql/postgreSqlUser.adapter';
import { UserService } from './services/user.service';
import { LoggerModule } from '../../modules/logger/logger.module';
import { BunyanLoggerAdapter } from '../../modules/logger/bunyanLogger.adapter';
import { DbUserPort } from './domain/ports/out/dbUserPort';
import { LoggerPort } from '../../modules/logger/logger.port';
import { PostgreSqlUserModule } from './modules/postgreSql/postgreSqlUser.module';
import { UserController } from './user.controller';

@Module({
  imports: [LoggerModule, PostgreSqlUserModule],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (
        loggerService: LoggerPort,
        userAdapter: DbUserPort,
      ) => {
        return new UserService(loggerService, userAdapter);
      },
      inject: ['LOGGER_SERVICE', PostgreSqlUserAdapter],
    },
  ],
  controllers: [UserController],
  exports: ['USER_SERVICE'],
})
export class UserModule {}
