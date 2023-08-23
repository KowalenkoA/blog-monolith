import { UserCreateDto } from "../../../users/domain/dto/user.create.dto";
import { UserEntity } from "../../../users/domain/entities/user.entity";


export interface AuthUserUseCaseInterface {
  register(userCreateDto: UserCreateDto): Promise<{ accessToken: string; refreshToken: string }>;
  login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string }>;
  getAuthTokens(user: UserEntity): Promise<{ accessToken: string; refreshToken: string }>;

  changePassword(id: UserEntity['id'], oldPassword: string, newPassword: string): Promise<UserEntity>;
}
