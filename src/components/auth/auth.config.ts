import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


const groupName = 'AUTH'

export class AuthConfig {

constructor(
  @Inject(ConfigService)
  private configService: ConfigService) {}

  public readonly saltLength: number = parseInt(this.configService.get<string>(`${groupName}__SALT_LENGTH`), 10) || 5;;
}


