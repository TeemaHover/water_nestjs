import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { UserAccessGuard } from "src/guard/auth.guard";
import { Price, PriceDocument } from "src/schema";
import { PriceDto } from "./price.dto";
@Controller('price')
@ApiTags('Price')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class PriceController {
  constructor(@InjectModel(Price.name) private model: Model<PriceDocument>) {}

  @Post()
  async createPrice(@Request() {user},  @Body() dto: PriceDto ) {
    try {
      if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
      // if(user.userType == "admin") {
        let price = await this.model.create({
          serviceId: dto.serviceId,
          user: user['_id'],
          servicePrice: dto.priceService
        })
      return price
      // }
      return 
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  @Get()
  async allPrices() {
    return await this.model.find()
  }

  @Get('/:serviceId/:type')
  @ApiParam({name:'serviceId'})
  @ApiParam({name:'type'})
  async getPrice(@Request() {user}, @Param('type') type, @Param('serviceId') serviceId) {
    try {
      let price 
      if (type == 'any') {
        price = await this.model.findOne({user: user['_id'], serviceId: serviceId,})
      } else {
        price = await this.model.findOne({user: user['_id'], serviceId: serviceId, 'servicePrice.serviceType' : type})
      }
      if(!price) throw new HttpException('not found', HttpStatus.NOT_FOUND)
      return price.servicePrice
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
  @Put('/:id')
  @ApiParam({name: 'id'} )
  async updatePrice(@Request() {user}, @Param('id') id: string,  @Body() dto: PriceDto ) {
    try {
      if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
  
         await this.model.findByIdAndUpdate(id, {
          serviceId: dto.serviceId,
          servicePrice: dto.priceService
        })
        return true
 
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}