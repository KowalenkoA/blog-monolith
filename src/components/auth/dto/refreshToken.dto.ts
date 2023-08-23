import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  refreshToken: string;
}
