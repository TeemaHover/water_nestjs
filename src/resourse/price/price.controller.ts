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
  @Put('/:id')
  @ApiParam({name: 'id'} )
  async updatePrice(@Request() {user}, @Param('id') id: string,  @Body() dto: PriceDto ) {
    try {
      if(!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED)
      if(user.userType == "admin") {
         await this.model.findByIdAndUpdate(id, {
          serviceId: dto.serviceId,
          servicePrice: dto.priceService
        })
        return true
      }
      return 
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}