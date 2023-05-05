import { ApiProperty } from "@nestjs/swagger"

export class RequirementDto {
  @ApiProperty()
  name: string
}
export class CertificateDto {
  @ApiProperty()
  name: string
  @ApiProperty({type: RequirementDto, isArray: true})
  requirements: RequirementDto[] 

}