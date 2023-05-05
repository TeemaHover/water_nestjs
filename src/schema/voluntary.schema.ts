import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type VoluntaryDocument = Document & Voluntary

export class Info {
    @Prop()
    title: string
    @Prop()
    description: string
    @Prop()
    image: string
}
@Schema({timestamps: true})
export class Voluntary  {
    
    @Prop()
    name: string

    @Prop([Info])
    info: Info[]
    

}

export const VoluntarySchema = SchemaFactory.createForClass(Voluntary)