import { Module } from '@nestjs/common';
import { JwtPort } from '../../modules/jwt/jwt.port';
import { JwtAdapter } from '../../modules/jwt/jwt.service';
import { GlobalJwtModule } from '../../modules/jwt/jwt.module';
import { AuthUserService } from './services/authUser.service';
import { AuthController } from './auth.controller';
import { AuthConfig } from './auth.config';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../../modules/logger/logger.module';
import { UserModule } from '../users/user.module';
import { LoggerPort } from '../../modules/logger/logger.port';
import { UserUseCaseInterface } from '../users/domain/ports/in/user.useCase';

@Module({
  imports: [
    LoggerModule,
    GlobalJwtModule,
    UserModule,
    ConfigModule
    
  ],
  providers: [
    AuthConfig,
    {
      provide: 'USER_AUTH_SERVICE',
      useFactory: (
        loggerAdapter: LoggerPort,
        authConfig: AuthConfig,
        userService: UserUseCaseInterface,
        jwtAdapter: JwtPort,
      ) => {
        return new AuthUserService(
          loggerAdapter,
          authConfig,
          userService,
          jwtAdapter,
        );
      },
      inject: [
        'LOGGER_SERVICE',
        AuthConfig,
        'USER_SERVICE',
        JwtAdapter,
      ],
    },
  ],
  controllers: [AuthController],
  exports: ['USER_AUTH_SERVICE'],
})
export class AuthModule {}
