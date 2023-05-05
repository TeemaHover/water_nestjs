import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BusinessRank, UserStatus, UserType } from "src/utils/enum";
import { Certificate } from "./certificate.schema";


export type BusinessDocument = Document & Business


@Schema({timestamps: true})
export class Business  {
    
  @Prop()
  companyName?: string

  @Prop()
  registerNumber?: string
  @Prop()
  companyRegisterNumber?: string

  @Prop({required: true})
  phone: string

  @Prop({required: true})
  password: string

  @Prop({type: String ,enum: UserType,  required: true, default: UserType.business})
  type: UserType;

  @Prop({ type: String, enum: UserStatus,  required: true })
  status?: UserStatus;

  @Prop({default: 0})
  xp?: number
  
  @Prop([Certificate])
  certificates?: Certificate[]
  
  @Prop({type: String, enum: BusinessRank, default: BusinessRank.bronze})
  businessRank?: BusinessRank

}

export const BusinessSchema = SchemaFactory.createForClass(Business)