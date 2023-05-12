import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Voluntary, VoluntaryDocument } from 'src/schema';
import { VoluntaryDto } from './voluntary.dto';
import { InfoDto } from './voluntary.dto';
@Injectable()
export class VoluntaryService {
  constructor(
    @InjectModel(Voluntary.name)
    private readonly model: Model<VoluntaryDocument>,
  ) {}
  async createVoluntary(dto: VoluntaryDto) {
    try {
      return await this.model.create(dto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getVoluntary() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getInfo(rank: string) {
    try {
      return await this.model
        .find({ 'info.rank': { $in: [rank] } })
        .select('info');
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async addInfo(id: string, dto: InfoDto) {
    try {
      return await this.model.updateOne(
        { id: id },
        {
          $addToSet: { info: dto },
        },
      );
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
