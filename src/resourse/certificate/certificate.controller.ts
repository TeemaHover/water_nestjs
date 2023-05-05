import { Body, Controller, Get, Post } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { CertificateDto } from './certificate.dto';
import { CertificateService } from './certificate.service';

@Controller('certificate')
@ApiTags('Certificate')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}
  
  @Roles(UserType.system)
  @Post()
  createCertificate(@Body() dto: CertificateDto) {
    try {
      return this.service.createCertificate(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @Roles(UserType.business)
  getCertificate() {
    try {
      return this.service.getCertificate()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  


}
