import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { OrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('order')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')

export class OrderController {
  constructor(private readonly service: OrderService) {}
  
  @Roles(UserType.user)
  @Post()
  createOrder(@Body() dto: OrderDto) {
    try {
      return this.service.createOrder(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @Roles(UserType.business)
  getCertificate() {
    try {
      return this.service.getOrder()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  


}
