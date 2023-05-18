import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostgreSqlUserEntity } from './postgreSqlUser.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { DbUserPort } from '../../domain/ports/out/dbUserPort';

@Injectable()
export class PostgreSqlUserAdapter implements DbUserPort {
  constructor(
    @InjectRepository(PostgreSqlUserEntity)
    private readonly sqlRepository: Repository<PostgreSqlUserEntity>,
  ) {}

  async findOne(whereData: Partial<UserEntity>): Promise<UserEntity | null> {
    const document = await this.sqlRepository.createQueryBuilder().where(whereData).getOne();

    if (document) {
      return document;
    }
    return null;
  }

  async find(whereData: Partial<UserEntity>): Promise<UserEntity[]> {
    const documentsList = await this.sqlRepository
      .createQueryBuilder('us')
      .where(whereData)
      .orderBy('us.id', 'DESC')
      .getMany();

    return documentsList;
  }

  async create(createDto: Partial<UserEntity>): Promise<UserEntity> {
    const document = await this.sqlRepository.save(createDto);

    return document;
  }

  async update(where: Partial<UserEntity>, updateDto: Partial<UserEntity>): Promise<void> {
    await this.sqlRepository.update(where, updateDto);
  }
}
