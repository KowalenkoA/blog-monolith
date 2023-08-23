import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPort } from './jwt.port';
import { JwtTokenException } from './jwt.exception';
import { JwtConfig } from './jwt.config';
import { AuthConfirmToken } from '../../components/auth/domain/auth.entity';
import { UserEntity } from '../../components/users/domain/entities/user.entity';

@Injectable()
export class JwtAdapter implements JwtPort {
  constructor(private readonly jwtService: JwtService, private readonly config: JwtConfig) {}

  async verifyAsync(token: string, options: JwtVerifyOptions): Promise<Record<string, string | number>> {
    return this.jwtService.verifyAsync(token, options);
  }

  async getAccessToken(userEntity: UserEntity): Promise<string> {
    const payload = {
      email: userEntity.email,
      id: userEntity.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.config.authPrivateKey,
      expiresIn: this.config.authPrivateKeyExpiresIn,
    });
  }

  async getRefreshToken(userEntity: UserEntity): Promise<string> {
    const payload = {
      email: userEntity.email,
      id: userEntity.id,
    };

    return this.jwtService.sign(payload, {
      secret: this.config.authRefreshKey,
      expiresIn: this.config.authRefreshKeyExpiresIn,
    });
  }

  async verifyAuthRefreshToken(token: string): Promise<AuthConfirmToken> {
    try {
      const data = await this.jwtService.verifyAsync(token, { secret: this.config.authRefreshKey });
      return data;
    } catch (error) {
      throw new JwtTokenException({ error, token });
    }
  }

  async verifyAuthConfirmToken(token: string): Promise<AuthConfirmToken> {
    try {
      const user = await this.jwtService.verifyAsync(token, { secret: this.config.authPrivateKey });
      return user;
    } catch (error) {
      throw new JwtTokenException({ error, token });
    }
  }

}
