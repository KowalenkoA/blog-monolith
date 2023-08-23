import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_ROUTE } from '../common/constants';
import { AuthUnauthorizedException } from '../../components/auth/auth.exception';
import { JwtConfig } from './jwt.config';
import { JwtService } from '@nestjs/jwt';
import { AuthConfirmToken } from '../../components/auth/domain/auth.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: JwtConfig,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicRoute) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new AuthUnauthorizedException({ authHeader });
      }

      const userData: AuthConfirmToken = await this.jwtService.verifyAsync(token, { secret: this.config.authPrivateKey });
      const { id, email } = userData;

      req.idUser = id;
      req.email = email;

      return true;
    } catch (error) {
      throw new AuthUnauthorizedException({ error });
    }
  }
}
