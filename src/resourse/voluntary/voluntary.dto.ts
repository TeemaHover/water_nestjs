import { ApiProperty } from '@nestjs/swagger';
import { InfoRank } from 'src/utils/enum';

export class InfoDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  level: number;
  @ApiProperty()
  date: number;
  @ApiProperty({ type: String, enum: InfoRank })
  rank: string;
}
export class ItemDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  unitPrice: number;
  @ApiProperty()
  symbol: string;
}
export class VoluntaryDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: InfoDto, isArray: true })
  info: InfoDto[];
  @ApiProperty({ type: ItemDto, isArray: true })
  items: ItemDto[];
}
