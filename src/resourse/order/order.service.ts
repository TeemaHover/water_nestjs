import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "src/schema";
import { ServiceStatus } from "src/utils/enum";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>){}


  async getUserOrders(id: string) {
    try {
      let orders = await this.model.find({$or: [{lawyerId: id}, {clientId: id}]})
      return orders
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  async updateOrderStatus(id: string, status: ServiceStatus,) {
    try {
      let order = await this.model.updateOne({_id: id}, {$set: {serviceStatus: status}})
      
      if(!order) return false
  
      return true
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}