import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Location, LocationDocument } from "src/schema";
import { LocationDto } from "./location.dto";
@Injectable() 
export class LocationService {
  constructor(@InjectModel(Location.name) private readonly model: Model<LocationDocument>) {}
  async createLocation(dto: LocationDto) {
    try {
      return await this.model.create(dto)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getLocation() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}