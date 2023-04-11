import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Product } from "./product.schema";
import { User } from "./user.schema";


export type CommentDocument = Document & Comment


@Schema({timestamps: true})
export class Comment  {
    @Prop({required: true})
    problem: string

    @Prop()
    message?: string
    
    @Prop({type: mongoose.Types.ObjectId, ref: 'users'})
    user: User
    @Prop({type: mongoose.Types.ObjectId, ref: 'users'})
    business: User

    @Prop({type: mongoose.Types.ObjectId, ref: 'products'})
    product: Product

    @Prop({type: mongoose.Types.ObjectId, ref: 'users'})
    carrier: User
}

export const CommentSchema = SchemaFactory.createForClass(Comment)