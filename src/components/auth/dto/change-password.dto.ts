import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  newPassword: string;
}
