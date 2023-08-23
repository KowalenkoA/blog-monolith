import { JwtVerifyOptions } from '@nestjs/jwt';
import { AuthConfirmToken } from '../../components/auth/domain/auth.entity';
import { UserEntity } from '../../components/users/domain/entities/user.entity';

export interface JwtPort {
  verifyAsync(token: string, options: JwtVerifyOptions): Promise<Record<string, string | number>>;

  // auth
  getAccessToken(userEntity: UserEntity): Promise<string>;
  getRefreshToken(userEntity: UserEntity): Promise<string>;
  verifyAuthConfirmToken(token: string): Promise<AuthConfirmToken>;
  verifyAuthRefreshToken(token: string): Promise<AuthConfirmToken>;
}
