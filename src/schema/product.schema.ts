import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";
import { Category } from "aws-sdk/clients/cloudformation";


export type ProductDocument = Document & Product

// export class ServiceProduct {
//   @Prop({ type: String, enum: ServiceType,  required: true })
//   serviceType: ServiceType
//   @Prop({required: true})
//   expiredTime: String
//   @Prop({required: true})
//   Product: number
  

// }
@Schema({timestamps: true})
export class Product  {
  @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'users'})
  business: User
  @Prop({type: mongoose.Types.ObjectId, ref: 'categories'})
  categoryId: Category

  @Prop()
  productName: string  

  @Prop()
  barcode: number  

  @Prop()
  unit: number  

  
}

export const ProductSchema = SchemaFactory.createForClass(Product)