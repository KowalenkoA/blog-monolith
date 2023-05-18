import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity, UserRoleEnum } from '../../domain/entities/user.entity';

@Entity({ name: 'user' })
@Index(['email'], { unique: true, where: '"deletedAt" IS NULL' })
export class PostgreSqlUserEntity implements UserEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  username?: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
