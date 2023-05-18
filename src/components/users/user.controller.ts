import { Body, Controller, Inject, Put, Post, Req } from '@nestjs/common';
import { UserUpdateDto } from './domain/dto/user.update.dto';
import { UserEntity } from './domain/entities/user.entity';
import { UserUseCaseInterface } from './domain/ports/in/user.useCase';
import { RequestWithUserId } from '../../modules/common/types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UserUseCaseInterface,
  ) {}

  @Post('/me')
  async me(@Req() request: RequestWithUserId): Promise<Partial<UserEntity>> {
    const { userId } = request;
    const { id, email, createdAt, role, username } =
      await this.userService.getOne({
        id: userId,
      });
    return { id, email, createdAt, role, username };
  }

  @Put('')
  updateUser(@Req() request: RequestWithUserId, @Body() userUpdateDto: UserUpdateDto): Promise<UserEntity> {
    const { userId } = request;
    return this.userService.update({id: userId}, userUpdateDto);
  }

}
