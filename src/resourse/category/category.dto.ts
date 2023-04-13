import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"

export class CategoryDto {
  
  @ApiProperty()
  @IsString()
  categoryName: string

  @ApiProperty()
  @IsArray()
  problems: []
}