import { Body, Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUserUseCaseInterface } from './ports/in/authUser.useCase';
import { PublicRoute } from '../../modules/common/constants';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { ThrottlePublic, IdUser } from '../../modules/common/decorators';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthLoginDto } from './dto/login.dto';
import { UserCreateDto } from '../users/domain/dto/user.create.dto';
import { UserEntity } from '../users/domain/entities/user.entity';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('USER_AUTH_SERVICE')
    private readonly authUserService: AuthUserUseCaseInterface,
  ) {}

  @PublicRoute()
  @ThrottlePublic()
  @Post('/login')
  public async login(@Body() userLoginDto: AuthLoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const data = await this.authUserService.login(
      userLoginDto.email,
      userLoginDto.password,
    );

    return { accessToken: data.accessToken, refreshToken: data.refreshToken };
  }

  @PublicRoute()
  @ThrottlePublic()
  @Post('/refresh')
  public async refreshToken(@Body() body: RefreshTokenDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken: token } = body;

    return this.authUserService.refreshToken(token);
  }

  @PublicRoute()
  @ThrottlePublic()
  @Post('/registration')
  public registration(@Body() userCreateDto: UserCreateDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authUserService.register(userCreateDto);
  }

  @Post('/change-password')
  async changePassword(@IdUser() id: UserEntity['id'], @Body() data: ChangePasswordDto): Promise<UserEntity> {
    return this.authUserService.changePassword(id, data.oldPassword, data.newPassword);
  }

}
