import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ServiceStatus, ServiceType } from 'src/utils/enum';

export class OrderDto {
  @ApiProperty()
  date: number;

  @ApiProperty()
  @IsString()
  clientId: string;

  @ApiProperty()
  @IsString()
  lawyerId: string;

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
