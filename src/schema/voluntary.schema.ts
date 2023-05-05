import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type VoluntaryDocument = Document & Voluntary


@Schema({timestamps: true})
export class Voluntary  {
    
    @Prop()
    name: string
    

}

export const VoluntarySchema = SchemaFactory.createForClass(Voluntary)