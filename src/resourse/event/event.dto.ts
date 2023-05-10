import { ApiProperty } from "@nestjs/swagger";
import { SaleTypes } from 'src/utils/enum';
export class ExecEventDto {
  @ApiProperty() 
  name: string
  @ApiProperty()
  description: string
}
export class SaleDetailDto {
  
  @ApiProperty()
  value: string
  @ApiProperty()
  name: string
  @ApiProperty({type: Number})
  unit: number
}
export class SaleDto {
  @ApiProperty() 
  name: string
  @ApiProperty()
  description: string
  @ApiProperty({ enum: SaleTypes, }) 
  type: SaleTypes
  @ApiProperty({type: SaleDetailDto, isArray: true})
  detail: SaleDetailDto[]

}
export class EventDto {
  @ApiProperty()
  volunteer: string
  @ApiProperty()
  name: string
  @ApiProperty()
  members: number
  @ApiProperty()
  registerMembers: number

  @ApiProperty() 
  startDate: number

  @ApiProperty() 
  endDate: number
  @ApiProperty() 
  exec: string
  @ApiProperty({type: ExecEventDto, isArray: true}) 
  execEvent: ExecEventDto
  @ApiProperty({type: SaleDto, isArray: true}) 
  sale: SaleDto
}



