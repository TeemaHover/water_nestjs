import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Business, BusinessDocument, Event, EventDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { EventDto } from "./event.dto";
@Injectable() 
export class EventService {
  constructor(@InjectModel(Event.name) private readonly model: Model<EventDocument>, @InjectModel(Business.name) private  business: Model<BusinessDocument>) {}
  async createEvent(dto: EventDto, user: string) {
    try {
      return await this.model.create({
        ...dto,
        business: user,
        voluntary: '64556342dc0d123c01c27f50',

      })
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getEvent() {
    try {
      return await this.model.find({endDate: {$gte: Date.now()}}).populate('business', 'id  companyName', this.business)
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