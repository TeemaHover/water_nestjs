import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { UserStatus, UserType } from "src/utils/enum";
import { Location } from "./location.schema";


export type PanelistDocument = Document & Panelist


@Schema({timestamps: true})
export class Panelist  {
    
  @Prop()
  companyName?: string

  @Prop()
  registerNumber?: string

  @Prop({required: true})
  phone: string

  @Prop({required: true})
  password: string

  @Prop({type: String ,enum: UserType,  required: true, default: UserType.panelist})
  type: UserType;

  @Prop({ type: String, enum: UserStatus,  required: true })
  status?: UserStatus;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Location'})
  location: Location

  @Prop([Location])
  locations: Location[]

}

export const PanelistSchema = SchemaFactory.createForClass(Panelist)