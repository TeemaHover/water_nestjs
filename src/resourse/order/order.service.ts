import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument, User, UserDocument } from "src/schema";
import { ServiceStatus } from "src/utils/enum";

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>){}


  async getUserOrders(id: string) {
    try {
      let orders = await this.model.find({$or: [{lawyerId: id}, {clientId: id}]}).populate('clientId', 'firstname lastname phone ', this.userModel  ).populate('lawyerId', 'firstname lastname phone profileImg', this.userModel  )
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