import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { SaleTypes } from "src/utils/enum";
import { Business } from "./business.schema";
import { Certificate } from "./certificate.schema";
import { User } from "./user.schema";
import { Voluntary } from "./voluntary.schema";


export type EventDocument = Document & Event

export class ExecEvent {
    @Prop() 
    name: string
    @Prop()
    description: string
}
export class SaleDetail {
    
    @Prop()
    value: string
    @Prop()
    name: string
    @Prop()
    unit: number
}
export class Sale {
    @Prop() 
    name: string
    @Prop()
    description: string
    @Prop({type: String, enum: SaleTypes, default: SaleTypes.price}) 
    type: SaleTypes
    @Prop([SaleDetail])
    detail: SaleDetail[]

}
@Schema({timestamps: true})
export class Event  {
    
    @Prop({type: mongoose.Types.ObjectId, ref: "voluntary"})
    voluntary: Voluntary

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop({type: mongoose.Types.ObjectId, ref: 'Business'})
    business: Business

    @Prop()
    members: number
    
    @Prop()
    registerMembers: number

    @Prop() 
    startDate: number

    @Prop() 
    endDate: number

    @Prop([Certificate])
    certificate?: Certificate[]
    @Prop()
    exec: string
    @Prop([ExecEvent])
    execEvent: ExecEvent[]

    @Prop({type: [{type: mongoose.Types.ObjectId, ref: "user"}]})
    users: User[]

    @Prop([Sale])
    sale: Sale[]



}

export const EventSchema = SchemaFactory.createForClass(Event)