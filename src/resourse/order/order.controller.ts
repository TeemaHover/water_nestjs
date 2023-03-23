import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import mongoose, { Model } from "mongoose";
import { UserAccessGuard } from "src/guard/auth.guard";
import { Order, OrderDocument } from "src/schema";
import { ServiceStatus, UserType } from "src/utils/enum";
import { OrderDto } from "./order.dto";
import { OrderService } from "./order.service";

@Controller('order')
@ApiTags('Orders')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class OrderController {
  constructor(private readonly service: OrderService, @InjectModel(Order.name) private model: Model<OrderDocument>) {}

  @Post('/:isClient')
  @ApiParam({name: 'isClient'})
  async createOrder(@Request() {user}, @Param('isClient') isClient: boolean,  @Body() dto: OrderDto) {
    try {
      if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
      let lawyerId = new mongoose.mongo.ObjectId(dto.lawyerId)
      let clientId = new mongoose.mongo.ObjectId(dto.clientId)
      let order = await this.model.create({
        clientId: isClient ? user['_id'] : clientId,
        date: dto.date,
        lawyerId: isClient ? lawyerId : user['_id'],
        location: dto.location,
        expiredTime: dto.expiredTime,
        serviceStatus: dto.serviceStatus,
        serviceId: dto.serviceId,
        serviceType: dto.serviceType,
        userToken: dto.userToken,
        lawyerToken: dto.lawyerToken,
        channelName: dto.channelName
      }) 
      return order
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  @Get('token/:id/:channelName/:token')
  @ApiParam({name: 'id'})
  @ApiParam({name: 'channelName'})
  @ApiQuery({name: 'token'})
  async setOrderToken(@Request() {user}, @Param('id') id: string, @Param('channelName') channelName: string, @Query('token') token: string) {
    if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
    try {
      if(user['userType'] == UserType.user) {
        let order = await this.model.findById(id)
        order.channelName = channelName;
        order.userToken = token;
        await order.save()
        return true
      } else {
        if(user['userType'] == UserType.lawyer) {
          let order = await this.model.findById(id)
          order.channelName = channelName;
          order.lawyerToken = token;
          await order.save()
          return true
        } else {
          return
        }
      }
    } catch (error) {
      throw new HttpException(error, 500)
    }
    
  }


  @Get()
  async allOrders(@Request() {user}) {
    if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
    if(user['userType'] == UserType.admin) {
      let orders = await this.model.find()
      return orders
    } 
    return false
  }

  @Get('user')
  getUserOrders(@Request() {user}) {
    if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
    return this.service.getUserOrders(user['_id'])
  }

  @Put('/:id')
  @ApiParam({name: 'id'})
  @ApiQuery({name: 'status'})
  updateOrderStatus(@Request() {user}, @Param('id') id: string, @Query('status') status: ServiceStatus) {
    if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
    return this.service.updateOrderStatus(id, status)
  }

}