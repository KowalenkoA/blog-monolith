import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgreSqlUserEntity } from './postgreSqlUser.entity';
import { PostgreSqlUserAdapter } from './postgreSqlUser.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([PostgreSqlUserEntity])],
  providers: [PostgreSqlUserAdapter],
  exports: [PostgreSqlUserAdapter],
})
export class PostgreSqlUserModule {}
