import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentStatus, UserType } from 'src/utils/enum';
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

  @Roles(UserType.panelist, UserType.user)
  @Post()
  createPayment(@Body() dto: PaymentDto, @Request() { user }) {
    return this.service.createPayment(dto, user);
  }

  @Get()
  @Roles(UserType.user, UserType.panelist)
  getPayment(@Request() { user }) {
    return this.service.getPayment(user);
  }

  @Get('access')
  @Roles(UserType.panelist)
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'status' })
  accessPayment(
    @Request() { user },
    @Param('id') id: string,
    @Param('status') status: PaymentStatus,
  ) {
    return this.service.accessPayment(id, user['_id'], status);
  }
}
