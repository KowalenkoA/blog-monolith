import { UserEntity } from '../../entities/user.entity';

export interface DbUserPort {
  findOne(whereData: Partial<UserEntity>): Promise<UserEntity | null>;
  find(whereData: Partial<UserEntity>): Promise<UserEntity[]>;

  create(userCreateDto: Partial<UserEntity>): Promise<UserEntity>;

  update(where: Partial<UserEntity>, updateDto: Partial<UserEntity>): Promise<void>;
}
