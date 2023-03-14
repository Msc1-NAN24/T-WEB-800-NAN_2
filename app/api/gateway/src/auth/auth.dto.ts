import { User } from '../model/user.schema';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty()
  password: string;
}
export class LoginResponseDto {
  @ApiProperty()
  user: User;
  @ApiProperty()
  access_token: string;
}

export class RegisterResponseDto {
  @ApiProperty()
  user: User;
  @ApiProperty()
  access_token: string;
}
