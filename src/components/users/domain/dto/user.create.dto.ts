
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @Transform((param) => param.value.trim().toLowerCase())
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  username?: string;

  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(100)
  password: string;

}
