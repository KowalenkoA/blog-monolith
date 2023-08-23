import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  password: string;
}
