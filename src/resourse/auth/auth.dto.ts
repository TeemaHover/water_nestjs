import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { UserStatus, UserType, WorkStatus } from 'src/utils/enum';

export class CarrierDetailDto {
  @ApiProperty()
  product: string;
  @ApiProperty()
  unit: number;
  @ApiProperty({ type: Array })
  returnedProduct: string[];
}
export class Location {
  @ApiProperty()
  lat: string;

  @ApiProperty()
  lng: string;
}
export class RegisterDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  shopName: string;

  @ApiProperty()
  registerNumber: string;

  @ApiProperty()
  companyRegisterNumber: string;

  @ApiProperty({ type: Location })
  location?: Location;

  @ApiProperty()
  @IsArray()
  carriers?: [];

  @ApiProperty({ type: CarrierDetailDto })
  carrierDetail?: CarrierDetailDto;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    enum: UserType,
  })
  type: UserType;
  @ApiProperty({
    type: String,
    enum: WorkStatus,
  })
  jobStatus: WorkStatus;

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
