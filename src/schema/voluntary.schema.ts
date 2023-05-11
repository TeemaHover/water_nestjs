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
export class Items {
    @Prop()
    title: string
    @Prop()
    unitPrice: number
    @Prop()
    symbol: string
    @Prop()
    items: [{
        title: string
    }]

}
@Schema({timestamps: true})
export class Voluntary  {
    
    @Prop()
    name: string

    @Prop([Items])
    items: Items[]

    @Prop([Info])
    info: Info[]
    

}

export const VoluntarySchema = SchemaFactory.createForClass(Voluntary)