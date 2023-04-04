import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';
import { ServiceStatus, ServiceType } from 'src/utils/enum';

export class OrderDto {
  @ApiProperty()
  date: number;

  @ApiProperty()
  @IsString()
  clientId: string;

  @ApiProperty()
  @IsString()
  lawyerId: string ;
  @ApiProperty()
  @IsString()
  @ValidateIf((object, value) => value !== null)
  serviceId: string | null;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  expiredTime: string;
  @ApiProperty({
    enum: ServiceType,
  })
  serviceType: ServiceType;

  @ApiProperty({
    enum: ServiceStatus,
    default: ServiceStatus.pending,
  })
  serviceStatus: ServiceStatus;

  @ApiProperty()
  @IsString()
  channelName: string;

  @ApiProperty()
  @IsString()
  userToken: string;
  @ApiProperty()
  @IsString()
  lawyerToken: string;
}
