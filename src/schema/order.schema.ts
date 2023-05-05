import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Business } from "./business.schema";
import { User } from "./user.schema";
import { Voluntary } from "./voluntary.schema";


export type OrderDocument = Document & Order

export class Product {
  @Prop()
  image: string
  @Prop()
  name: string
  
}

@Schema({timestamps: true})
export class Order  {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Business'})
    business: Business

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Voluntary'})
    voluntary: Voluntary

    @Prop()
    price: number

    @Prop([Product])
    product: Product[]


}

export const OrderSchema = SchemaFactory.createForClass(Order)