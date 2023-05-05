import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { BusinessRank, UserRank, UserStatus, UserType } from 'src/utils/enum';
import { CertificateDto } from '../certificate/certificate.dto';

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
  @ApiProperty({ default: 0 })
  xp: number;

  @ApiProperty()
  location: string;

  @ApiProperty({ default: 0 })
  point: number;

  @ApiProperty({ type: String, enum: UserRank, default: UserRank.bronze })
  rank: UserRank;

  @ApiProperty({ type: CertificateDto, isArray: true })
  certificates: CertificateDto[];
}
export class BusinessDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  registerNumber: string;

  @ApiProperty()
  companyRegisterNumber: string;

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
  @ApiProperty({ default: 0 })
  xp: number;

  @ApiProperty({ type: String, enum: BusinessRank, default: BusinessRank.bronze })
  businessRank: BusinessRank;

  @ApiProperty({ type: CertificateDto, isArray: true })
  certificates: CertificateDto[];
}
export class PanelistDto {
  @ApiProperty()
  companyName: string;

  @ApiProperty()
  registerNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  
  @ApiProperty()
  location: string;

  @ApiProperty()
  locations: string[];

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
