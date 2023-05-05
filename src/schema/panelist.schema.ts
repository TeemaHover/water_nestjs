import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserStatus, UserType } from "src/utils/enum";


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

}

export const PanelistSchema = SchemaFactory.createForClass(Panelist)