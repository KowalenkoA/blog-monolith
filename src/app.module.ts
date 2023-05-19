import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './components/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from './modules/postgreSql/typeorm.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRootAsync(TypeOrmConfigAsync), UserModule],
  providers: [AppService],
})
export class AppModule {}
