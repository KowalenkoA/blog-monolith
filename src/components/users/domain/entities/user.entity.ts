export enum UserRoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserEntity = {
  id: number;
  email: string;
  username?: string;
  passwordHash: string;
  role: UserRoleEnum;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
};

