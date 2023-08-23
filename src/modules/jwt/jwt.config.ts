import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const groupName = 'JWT'

export class JwtConfig {

constructor(
  @Inject(ConfigService)
  private configService: ConfigService) {}

  public readonly authPrivateKey: string = this.configService.get<string>(`${groupName}__AUTH_PRIVATE_KEY`) || 'secret_private_key';

  public readonly authPrivateKeyExpiresIn: string = this.configService.get<string>(`${groupName}__AUTH_PRIVATE_KEY_EXPIRES_IN`) || '24h';

  public readonly authRefreshKey: string = this.configService.get<string>(`${groupName}__AUTH_REFRESH_KEY`) || 'secret_refresh_key';

  public readonly authRefreshKeyExpiresIn: string = this.configService.get<string>(`${groupName}__AUTH_REFRESH_KEY_EXPIRES_IN`) || '30d';

}
