import * as bcrypt from 'bcryptjs';
import { AuthUserUseCaseInterface } from '../ports/in/authUser.useCase';
import {
  AuthIncorrectConfidentialException,
  AuthUserAlreadyExistsException,
} from '../auth.exception';
import { JwtPort } from '../../../modules/jwt/jwt.port';
import { AuthConfig } from '../auth.config';
import { LoggerPort } from '../../../modules/logger/logger.port';
import { UserUseCaseInterface } from '../../users/domain/ports/in/user.useCase';
import { UserCreateDto } from '../../users/domain/dto/user.create.dto';
import { UserEntity } from '../../users/domain/entities/user.entity';

export class AuthUserService implements AuthUserUseCaseInterface {
  constructor(
    private readonly loggerAdapter: LoggerPort,
    private readonly authConfig: AuthConfig,
    private readonly userService: UserUseCaseInterface,
    private readonly jwtAdapter: JwtPort,
  ) {}

  async register(userCreateDto: UserCreateDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password, username } = userCreateDto;

    const exists = await this.userService.findOne({ email });
    if (exists) {
      throw new AuthUserAlreadyExistsException({ email });
    }

    const passwordHash = await bcrypt.hash(password, this.authConfig.saltLength);

    const user = await this.userService.create({ email, username, passwordHash });


    this.loggerAdapter.info('New user registered', this.constructor.name, { user });

    return this.getAuthTokens(user);
  }


  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.getOne({ email });

    const passwordEquals = await bcrypt.compare(password, user.passwordHash);

    if (!passwordEquals) {
      throw new AuthIncorrectConfidentialException();
    }

    this.loggerAdapter.info('User logged in', this.constructor.name, { user });

    return this.getAuthTokens(user);
  }

  async getAuthTokens(user: UserEntity): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshToken = await this.jwtAdapter.getRefreshToken(user);
    const accessToken = await this.jwtAdapter.getAccessToken(user);

    return { refreshToken, accessToken };
  }

  async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string }> {
    const { id } = await this.jwtAdapter.verifyAuthRefreshToken(token);

    const user = await this.userService.getOne({ id });

    return this.getAuthTokens(user);
  }


  async changePassword(id: UserEntity['id'], oldPassword: string, newPassword: string): Promise<UserEntity> {
    const user = await this.userService.getOne({ id });

    const passwordEquals = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!passwordEquals) {
      throw new AuthIncorrectConfidentialException();
    }

    const passwordHash = await bcrypt.hash(newPassword, 5);

    const updatedUser = await this.userService.update({ id: user.id }, { passwordHash });

    this.loggerAdapter.info('User change password', this.constructor.name, { user, oldPassword, newPassword });
    return updatedUser;
  }
}
