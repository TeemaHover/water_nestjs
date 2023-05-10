import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Event, EventDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { EventDto } from "./event.dto";
@Injectable() 
export class EventService {
  constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>) {}
  async createEvent(dto: EventDto, user: string) {
    try {
      return await this.model.create({
        ...dto,
        business: user

      })
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getEvent() {
    try {
      return await this.model.find({endDate: {$gte: Date.now()}})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async addMemberEvent(id: string, user: any) {
    try {
      let event = await this.model.findById(id)
      if(!event) throw new HttpException("Event not found", 404)
      
      if(event.members <= event.registerMembers+1) throw new HttpException("Event is full", 400)
      event =  await this.model.findByIdAndUpdate(id, { $inc: { registerMembers: 1 }, $push : {users: user} })
      if(event) return true
      else return false
    } catch (error) {
      console.error(error.message)
      throw new HttpException(error.message, 500)
    }
  }

  async getEventByBusiness(id: string, user: UserType) {
    try {
      if(user === UserType.user) return await this.model.find({business: id}).select('-users')
      return await this.model.find({business: id})
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }
}