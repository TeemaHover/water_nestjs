import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

import { UserType } from "src/utils/enum";

export class RegisterDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({minLength: 6})
    @IsString()
    @IsNotEmpty()
    password: string


    @ApiProperty({
        enum: UserType,
        default: UserType.user
    })
    userType: UserType;


    @ApiProperty()
    experience: number
    
    @ApiProperty()
    bio: string

    @ApiProperty()
    profileImg: string

}

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string

  @ApiProperty({minLength: 6})
  @IsString()
  @IsNotEmpty()
  password: string
}