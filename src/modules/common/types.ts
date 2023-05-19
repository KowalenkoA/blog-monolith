import { UserEntity } from "../../components/users/domain/entities/user.entity";

export type RequestWithUserId = Request & { userId: UserEntity['id'] };