import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schema';
import { OrderStatus } from 'src/utils/enum';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private model: Model<OrderDocument>) {}

  async create(dto: OrderDto, userId: string) {
    try {
      return await this.model.create({
        user: userId,
        business: dto.business,
        orders: dto.orders,
        location: dto.location,
        carrier: dto.carrier,
        status: dto.status,
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async viewForUsers(userId: string) {
    try {
      return await this.model.find({ user: userId });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async viewForBusiness(userId: string) {
    try {
      let orders = await this.model.find({ business: userId });
      if (!orders) return [];
      return orders;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async updateOrderStatus(userId: string, status: OrderStatus, id: string) {
    try {
      let order = await this.model.updateOne(
        { business: userId, _id: id },
        {
          $set: { status: status },
        },
      );
      if (order) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
