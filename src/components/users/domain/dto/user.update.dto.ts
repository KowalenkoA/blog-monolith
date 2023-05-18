import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserUpdateDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  @Transform((param) => param.value.trim().toLowerCase())
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  password?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  username?: string;
}
