import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { PaymentDto } from "./payment.dto";
@Injectable() 
export class PaymentService {
  constructor(@InjectModel(Payment.name) private readonly model: Model<PaymentDocument>) {}
  async createPayment(dto: PaymentDto, user: any) {
    try {
      let payment = await this.model.findOne({$or: [{user: user['_id']}, {panelist: user['_id']}]})
     if(user['type'] == UserType.user) {
      if(payment) {
        return await this.model.findByIdAndUpdate(payment['_id'], {
          userItem:dto.userItem,
          user: user['_id'],
          date: dto.date
        })
      } else {
        return await this.model.create({
          voluntary: '64556342dc0d123c01c27f50',
          userItem:dto.userItem,
          user: user['_id'],
          date: dto.date
        })
      }
      
     } else {
      let price = dto.items.reduce((a, b) => a + (b['unitPrice'] * b['quantity']), 0)
      if(payment) {
        return await this.model.findByIdAndUpdate(payment['_id'], {
          items:dto.userItem,
          panelist: user['_id'],
          date: dto.date,
          price: price
        })
      } else {
        return await this.model.create({
          voluntary: '64556342dc0d123c01c27f50',
          items:dto.items,
          panelist: user['_id'],
          date: dto.date,
          price: price
        })
      }
     }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
 
  async getPayment(user:any) {
    try {
      return await this.model.find({$or: [{user: user['_id']}, {panelist: user['_id']}]}).sort({date: -1})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}