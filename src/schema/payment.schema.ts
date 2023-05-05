import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Panelist } from "./panelist.schema";
import { User } from "./user.schema";
import { Voluntary } from "./voluntary.schema";


export type PaymentDocument = Document & Payment



@Schema({timestamps: true})
export class Payment  {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Voluntary'})
    voluntary: Voluntary

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Panelist'})
    panelist: Panelist

    @Prop()
    price?: number

    @Prop()
    date: number
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)