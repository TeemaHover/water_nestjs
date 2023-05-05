import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type CertificateDocument = Document & Certificate

export class Requirements {
  @Prop()
  name: string
}

@Schema({timestamps: true})
export class Certificate  {
    
    @Prop()
    name: string
    @Prop([Requirements])
    requirements: Requirements[] 

}

export const CertificateSchema = SchemaFactory.createForClass(Certificate)