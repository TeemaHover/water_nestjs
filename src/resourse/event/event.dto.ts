import { ApiProperty } from "@nestjs/swagger";

export class EventDto {
  @ApiProperty()
  volunteer: string
  @ApiProperty()
  name: string
  @ApiProperty()
  expiredTime: number
}