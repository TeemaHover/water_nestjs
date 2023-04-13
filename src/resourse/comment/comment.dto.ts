import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CommentDto {
  @ApiProperty()
  @IsString()
  problem: string
  
  @ApiProperty()
  message?: string
  @ApiProperty()
order: string
  

  @ApiProperty()
  @IsString()
  business: string
  
  @ApiProperty()
  @IsString()
  product: string

  @ApiProperty()
  @IsString()
  carrier: string
}