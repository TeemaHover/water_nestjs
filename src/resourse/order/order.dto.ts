import { ApiProperty } from "@nestjs/swagger";
export class ProductDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  image: string
}
export class OrderDto {
  @ApiProperty()
  business: string
  @ApiProperty()
  user: string
  @ApiProperty()
  voluntary: string
  @ApiProperty({type: ProductDto, isArray: true})
  product: ProductDto[]
  
}