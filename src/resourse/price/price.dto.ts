import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { ServiceType } from "src/utils/enum";

export class PriceServiceDto {

    @ApiProperty({
      enum: ServiceType
    }) 
    serviceType: ServiceType
    @ApiProperty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsString()
    expiredTime: String;

  
} 
export class PriceDto {
  @ApiProperty()
  @IsString()
  serviceId: string

  @ApiProperty({type: PriceServiceDto, isArray: true})
  priceService: PriceServiceDto
}