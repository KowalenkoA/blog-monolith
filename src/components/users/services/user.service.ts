import { UserUseCaseInterface } from '../domain/ports/in/user.useCase';
import { UserEntity, UserRoleEnum } from '../domain/entities/user.entity';
import { DbUserPort } from '../domain/ports/out/dbUserPort';
import { LoggerPort } from '../../../modules/logger/logger.port';
import { UserNotFoundException } from '../domain/user.exception';

export class UserService implements UserUseCaseInterface {
  constructor(
    private readonly loggerService: LoggerPort,
    private readonly userAdapter: DbUserPort,
  ) {}

  async create(userCreateDto: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userAdapter.create(userCreateDto);
    this.loggerService.info('Create user', 'UserService', user);
    return user;
  }

  async getOne(where: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userAdapter.findOne(where);

    if (!user) {
      throw new UserNotFoundException({ where });
    }

    return user;
  }

  async findOne(where: Partial<UserEntity>): Promise<UserEntity | null> {
    return this.userAdapter.findOne(where);
  }

  async find(where: Partial<UserEntity>): Promise<UserEntity[]> {
    return this.userAdapter.find(where);
  }

  async update(where: Partial<UserEntity>, updateDto: Partial<UserEntity>): Promise<UserEntity> {
    await this.userAdapter.update(where, updateDto);

    this.loggerService.info('Update user', 'UserService', { where, updateDto });

    const updatedUser = await this.getOne(where);

    return updatedUser;
  }

}
