import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from "src/schema";
import { PaymentDto } from "./payment.dto";
@Injectable() 
export class PaymentService {
  constructor(@InjectModel(Payment.name) private readonly model: Model<PaymentDocument>) {}
  async createPayment(dto: PaymentDto) {
    try {
      return await this.model.create(dto)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getPayment() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}