import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";


export type RatingDocument = Document & Rating


@Schema({timestamps: true})
export class Rating  {


    @Prop({type: mongoose.Types.ObjectId , ref: "users"})
    clientId?: User

    @Prop()
  comment?: String

  @Prop({required: true})
  rating: number

}

export const RatingSchema = SchemaFactory.createForClass(Rating)