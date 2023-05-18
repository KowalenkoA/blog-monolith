import { UserEntity } from '../../entities/user.entity';

export interface UserUseCaseInterface {
  create(userCreateDto: Partial<UserEntity>): Promise<UserEntity>;

  update(where: Partial<UserEntity>, updateDto: Partial<UserEntity>): Promise<UserEntity>;

  getOne(where: Partial<UserEntity>): Promise<UserEntity>;
  findOne(where: Partial<UserEntity>): Promise<UserEntity | null>;
}
