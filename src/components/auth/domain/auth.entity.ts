import { UserEntity } from "../../users/domain/entities/user.entity";

export type AuthConfirmToken = {
    id: UserEntity['id'];
    email: UserEntity['email'];
  };