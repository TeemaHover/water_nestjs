import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { EventTypes } from "src/utils/enum";
import { Certificate } from "./certificate.schema";
import { Voluntary } from "./voluntary.schema";


export type EventDocument = Document & Event


@Schema({timestamps: true})
export class Event  {
    
    @Prop({type: mongoose.Types.ObjectId, ref: "voluntary"})
    voluntary: Voluntary

    @Prop()
    name: string

    @Prop()
    expiredTime: number

    @Prop([Certificate])
    certificate: Certificate[]

    @Prop()
    xp: number

    @Prop()
    price: number

    @Prop({type: 'String' , enum: EventTypes, default: EventTypes.price})
    type: EventTypes

}

export const EventSchema = SchemaFactory.createForClass(Event)