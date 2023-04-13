import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class ProductDto {
  @ApiProperty()
  @IsString()
  business: string
  @ApiProperty()
  @IsString()
  categoryId: string
  
  @ApiProperty()
  @IsString()
  productName: string  
  
  @ApiProperty()
  barcode: number  
  
  @ApiProperty()
  unit: number  

  @ApiProperty()
  minUnit: number  
  
  @ApiProperty()
  @IsNumber()
  price: number  

  @ApiProperty({type: Array})
  images: string[]

}