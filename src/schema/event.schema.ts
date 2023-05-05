import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
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

}

export const EventSchema = SchemaFactory.createForClass(Event)