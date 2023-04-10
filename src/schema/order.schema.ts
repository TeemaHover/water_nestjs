import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { OrderStatus, ServiceStatus, ServiceType } from "src/utils/enum";
import { Location, User } from "./user.schema";
import { OrderStatus } from "aws-sdk/clients/outposts";


export type OrderDocument = Document & Order

export class Orders {
    @Prop({type: mongoose.Types.ObjectId, ref: 'product'})
    product: Product
    @Prop()
    unit: number

}

@Schema({timestamps: true})
export class Order  {


    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    shop: User 

    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    business: User

    @Prop({type: mongoose.Types.Array})
    orders: Orders[]

    @Prop()
    location?: Location

    @Prop({type: mongoose.Types.ObjectId, ref: "users"})
    carrier: User

    // @Prop({ type: String, enum: ServiceType,   required: true })
    // serviceType: ServiceType

    @Prop({ type: String, enum: OrderStatus ,  required: true })
    status: OrderStatus

}

export const OrderSchema = SchemaFactory.createForClass(Order)