import { UserEntity } from "../../components/users/domain/entities/user.entity";

export type RequestWithUserData = Request & { idUser: UserEntity['id'], email: UserEntity['email'] };