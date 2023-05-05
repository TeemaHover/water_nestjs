import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Event, EventDocument } from "src/schema";
import { EventDto } from "./event.dto";
@Injectable() 
export class EventService {
  constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>) {}
  async createEvent(dto: EventDto) {
    try {
      return await this.model.create(dto)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getEvent() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}