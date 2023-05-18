import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserLoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @Transform((param) => param.value.trim().toLowerCase())
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  password: string;
}
