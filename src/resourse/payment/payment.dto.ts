import { ApiProperty } from "@nestjs/swagger";

export class PaymentDto {
  @ApiProperty()
  voluntary: string
  @ApiProperty()
  user: string
  @ApiProperty()
  panelist: string
  @ApiProperty()
  price: number
  @ApiProperty()
  date: number
}