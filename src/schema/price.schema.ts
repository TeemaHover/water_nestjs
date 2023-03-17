import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ServiceType } from "src/utils/enum";
import { Service } from "./service.schema";


export type PriceDocument = Document & Price

export class ServicePrice {
  @Prop({ type: String, enum: ServiceType,  required: true })
  serviceType: ServiceType
  @Prop({required: true})
  expiredTime: String
  @Prop({required: true})
  price: number
  @Prop({type: Array, required: true})
  time: Date[]
}
@Schema({timestamps: true})
export class Price  {

  @Prop({type: mongoose.Types.ObjectId, ref: 'services'})
  serviceId: Service
  @Prop()
  servicePrice: ServicePrice[]  

}

export const PriceSchema = SchemaFactory.createForClass(Price)