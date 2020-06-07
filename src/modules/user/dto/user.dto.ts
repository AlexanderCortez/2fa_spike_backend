import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  ValidateIf,
  isEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ required: false })
  @ValidateIf(o => !isEmpty(o.name))
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;
}