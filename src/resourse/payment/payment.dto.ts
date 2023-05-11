import { ApiProperty } from "@nestjs/swagger";

export class ItemDto {
  @ApiProperty()
  title: string
  @ApiProperty()
  unitPrice: number
  @ApiProperty()
  symbol: string
  @ApiProperty()
  quantity: number
}
export class PaymentDto {
  @ApiProperty()
  voluntary: string
  @ApiProperty({type: ItemDto, isArray: true})
  items: ItemDto[]

  @ApiProperty({type: ItemDto, isArray: true})
  userItem: ItemDto[]
  @ApiProperty()
  panelist: string
  @ApiProperty()
  price: number
  @ApiProperty()
  date: number
}