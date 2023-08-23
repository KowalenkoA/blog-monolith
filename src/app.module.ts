import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './components/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from './modules/postgreSql/typeorm.config';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRootAsync(TypeOrmConfigAsync), UserModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
