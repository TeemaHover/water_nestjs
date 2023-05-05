import { ApiProperty } from "@nestjs/swagger";

export class VoluntaryDto {
  @ApiProperty()
  name: string
}