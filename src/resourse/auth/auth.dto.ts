import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserStatus, UserType } from 'src/utils/enum';


export class UserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;


  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    enum: UserType,
  })
  type: UserType;
  @ApiProperty({ type: String, enum: UserStatus })
  status: UserStatus;
}
export class BusinessDto {
  @ApiProperty()
  companyName: string
  
  @ApiProperty()
  registerNumber: string

  @ApiProperty()
  companyRegisterNumber: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;


  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    enum: UserType,
  })
  type: UserType;
  @ApiProperty({ type: String, enum: UserStatus })
  status: UserStatus;
}
export class PanelistDto {
  @ApiProperty()
  companyName: string
  
  @ApiProperty()
  registerNumber: string
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;


  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    enum: UserType,
  })
  type: UserType;
  @ApiProperty({ type: String, enum: UserStatus })
  status: UserStatus;
}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;
}
