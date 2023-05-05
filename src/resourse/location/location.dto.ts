import { ApiProperty } from "@nestjs/swagger";

export class LocationDto {
  @ApiProperty()
  district: string

  @ApiProperty()
  committee: string
  @ApiProperty()
  location: string

}