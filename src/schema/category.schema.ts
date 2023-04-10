import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";


export type CategoryDocument = Document & Category


@Schema({timestamps: true})
export class Category  {


  @Prop()
  categoryName: string

  @Prop({type: mongoose.Types.Array})
  problems: string[]

}

export const CategorySchema = SchemaFactory.createForClass(Category)