import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const groupName = 'POSTGRESQL'

export class PostgreSqlConfig {

constructor(
  @Inject(ConfigService)
  private configService: ConfigService) {}

  public readonly host: string = this.configService.get<string>(`${groupName}__HOST`) || 'postgres-blog-db';

  public readonly port: number = parseInt(this.configService.get<string>(`${groupName}__PORT`), 10) || 5432;

  public readonly user: string = this.configService.get<string>(`${groupName}__USER`) || 'bloguser';

  public readonly password: string = this.configService.get<string>(`${groupName}__PASSWORD`) || 'qwebloguser';

  public readonly db: string = this.configService.get<string>(`${groupName}__DB`) || 'blog';

  public readonly connectionPoolSize: number = parseInt(this.configService.get<string>(`${groupName}__CONNECTION_POOL_SIZE`), 10) || 4;

  public readonly synchronizeSchema: boolean = (this.configService.get<string>(`${groupName}__SYNCHRONIZE_SCHEMA`) === 'true') || false;

  public readonly isTypeormLogEnable: boolean = (this.configService.get<string>(`${groupName}__IS_TYPEORM_LOG_ENABLE`) === 'true') || false;
}
