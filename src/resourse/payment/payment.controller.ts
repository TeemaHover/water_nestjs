import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
@ApiTags('Payment')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')

export class PaymentController {
  constructor(private readonly service: PaymentService) {}
  
  @Roles(UserType.panelist)
  @Post()
  createPayment(@Body() dto: PaymentDto) {
    try {
      return this.service.createPayment(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @Roles(UserType.user, UserType.panelist)
  getCertificate() {
    try {
      return this.service.getPayment()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  


}
