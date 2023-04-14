import { Body, Controller, Get, HttpException, Param, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { OrderDto } from "./order.dto";
import { OrderService } from "./order.service";

@Controller('order')
@ApiTags('Orders')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class OrderController {
  constructor(private service: OrderService) {}

   @Post()
  create(@Request() {user}, @Body() dto: OrderDto) {
    if( user['type'] != UserType.shop || user['type'] != UserType.user ) throw new HttpException('error', 401)
    return this.service.create(dto, user["_id"])
  }

  // @Roles(UserType.shop, UserType.user)
  @Get('user')
  viewForUsers(@Request() {user}) {
    if( user['type'] != UserType.shop || user['type'] != UserType.user ) throw new HttpException('error', 401)
    return this.service.viewForUsers( user["_id"])
  }


  @Get('business')
  viewForBusiness(@Request() {user}) {
    if( user['type'] != UserType.business ) throw new HttpException('error', 401)
    return this.service.viewForBusiness( user["_id"])
  }

  @Get('status/:status/:id')
  @ApiParam({name: 'status'})
  @ApiParam({name: 'id'})
  updateOrderStatus(@Request() {user}, @Param('status') status, @Param('id') id) {
    return this.service.updateOrderStatus(user['_id'], status, id)
  }
}