import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TwoFactorActivateDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}