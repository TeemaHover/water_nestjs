import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ServiceType } from 'src/utils/enum';

export class RatingDto {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  rating: number;
}

export class ServiceTypeTime {
  @ApiProperty({
    enum: ServiceType,
    }) 
  serviceType: ServiceType
  @ApiProperty({ isArray: true, type: String })
  @IsArray()
  time: string[];
}

export class AvailableDay {

  @ApiProperty()
  @IsString()
  date: string;
  
  @ApiProperty({type: ServiceTypeTime, isArray: true})
  serviceTypeTime: ServiceTypeTime[]

  @ApiProperty()
  @IsString()
  serviceId: string;
  

}

export class LawyerDto {
  @ApiProperty()
  @IsString()
  bio: string;

  @ApiProperty()
  @IsString()
  profileImg: string;

  @ApiProperty()
  @IsNumber()
  experience: number;

  @ApiProperty({ type: AvailableDay, isArray: true })
  availableDays: AvailableDay[];
}
