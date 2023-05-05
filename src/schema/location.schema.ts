import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type LocationDocument = Document & Location



@Schema({timestamps: true})
export class Location  {
    @Prop()
    district: string
    @Prop()
    committee : string
    @Prop()
    location: string
}

export const LocationSchema = SchemaFactory.createForClass(Location)