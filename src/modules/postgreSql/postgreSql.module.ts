/* eslint-disable import/no-cycle */
import { Module } from '@nestjs/common';
import { PostgreSqlConfig } from './postgreSql.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    PostgreSqlConfig
  ],
  exports: [PostgreSqlConfig],
})
export class PostgreSqlModule {}
