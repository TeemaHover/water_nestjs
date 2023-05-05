import { ApiProperty } from "@nestjs/swagger";

export class InfoDto {
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty()
  image: string
  
}
export class VoluntaryDto {
  @ApiProperty()
  name: string
  @ApiProperty({type: InfoDto, isArray: true})
  info: InfoDto[]
}