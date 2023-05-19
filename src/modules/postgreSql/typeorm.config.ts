/* eslint-disable no-inline-comments */
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgreSqlConfig } from './postgreSql.config';
import { PostgreSqlModule } from './postgreSql.module';

export class TypeOrmConfig {
  static getOrmConfig(config: PostgreSqlConfig): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.user,
      password: config.password,
      autoLoadEntities: false,
      entities: [`${__dirname}/../../**/modules/**/*.entity.{ts,js}`],
      database: config.db,

      synchronize: config.synchronizeSchema,
      dropSchema: false, 

      migrationsRun: false,
      migrations: [`${__dirname}/../../migrations/**/*{.ts,.js}`],
      migrationsTableName: 'migrations_typeorm',

      logging: !!config.isTypeormLogEnable,
      logger: config.isTypeormLogEnable ? 'file' : undefined,

      maxQueryExecutionTime: 10_000,

      extra: {
        poolSize: config.connectionPoolSize,
      },
      keepConnectionAlive: true,

      
    };
  }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [PostgreSqlModule],
  useFactory: async (config: PostgreSqlConfig): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(config),
  inject: [PostgreSqlConfig],
};
