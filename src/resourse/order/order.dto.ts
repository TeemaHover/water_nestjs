import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"
import { OrderStatus } from "src/utils/enum"
import { Location } from "../auth/auth.dto"

export class OrderDetailDto {
  @ApiProperty()
  @IsString()
  product: string
  @ApiProperty()
  @IsNumber()
  unit: number
}
export class OrderDto {
  @ApiProperty()
  @IsString()
  business: string

  @ApiProperty()
  @IsString()
  order: string
  

  @ApiProperty({type: [OrderDetailDto]})
  orders: OrderDetailDto[]

  @ApiProperty({type: Location})
  location?: Location

  @ApiProperty()
  carrier: string


  @ApiProperty({ type: String, enum: OrderStatus  })
  status: OrderStatus
}