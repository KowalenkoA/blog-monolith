import { UserEntity } from "../../components/users/domain/entities/user.entity";

export type RequestWithIdUser = Request & { idUser: UserEntity['id'] };