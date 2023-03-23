import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ServiceType, UserStatus, UserType } from "src/utils/enum";
import { Rating } from "./rating.schema";
import { Service } from "./service.schema";


export type UserDocument = Document & User

export class AvailableTime {

  @Prop({required: true})
  day: string
  @Prop({required: true})
  time: string[]
  @Prop({required: true})
  date: number
}

export class AvailableDay {
  @Prop({required: true})
  date: string
  
  @Prop({required: true, type: mongoose.Types.ObjectId, ref: "services"})
  serviceId: Service
  @Prop({ type: Array, enum: ServiceType,  required: true })
  serviceType: ServiceType[]
  @Prop({type: Array, required: true})
  time: AvailableTime[]
}

@Schema({timestamps: true})
export class User  {
    @Prop({required: true})
    firstname: string

    @Prop({required: true})
    lastname: string

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({ type: String, enum: UserType, default: UserType.user, required: true })
    userType: UserType;

    @Prop()
    experience?: number
    
    @Prop()
    bio?: String

    @Prop()
    ratingAvg?: number

    @Prop()
    rating?: Rating[]

    @Prop()
    profileImg?: String

    @Prop({ type: String, enum: UserStatus, default: UserStatus.pending, required: true })
    userStatus: UserStatus;

    @Prop()
    availableDays?: AvailableDay[] 


}

export const UserSchema = SchemaFactory.createForClass(User)