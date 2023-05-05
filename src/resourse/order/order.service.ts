import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Order, OrderDocument } from "src/schema";
import { OrderDto } from "./order.dto";
@Injectable() 
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly model: Model<OrderDocument>) {}
  async createOrder(dto: OrderDto) {
    try {
      return await this.model.create(dto)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getOrder() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}