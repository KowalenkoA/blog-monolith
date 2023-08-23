import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAdapter } from './jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from './jwt.config';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  providers: [JwtAdapter, JwtConfig],
  exports: [JwtAdapter],
})
export class GlobalJwtModule {}
