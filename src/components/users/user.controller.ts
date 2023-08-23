import { Body, Controller, Inject, Put, Post, Req } from '@nestjs/common';
import { UserUpdateDto } from './domain/dto/user.update.dto';
import { UserEntity } from './domain/entities/user.entity';
import { UserUseCaseInterface } from './domain/ports/in/user.useCase';
import { ApiTags } from '@nestjs/swagger';
import { IdUser } from '../../modules/common/decorators';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UserUseCaseInterface,
  ) {}

  @Post('/me')
  async me(@IdUser() idUser: UserEntity['id']): Promise<Partial<UserEntity>> {
    const { id, email, createdAt, role, username } =
      await this.userService.getOne({
        id: idUser,
      });
    return { id, email, createdAt, role, username };
  }

  @Put('')
  updateUser(@IdUser() idUser: UserEntity['id'], @Body() userUpdateDto: UserUpdateDto): Promise<UserEntity> {
    return this.userService.update({id: idUser}, userUpdateDto);
  }

}
