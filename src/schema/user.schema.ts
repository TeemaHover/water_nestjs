import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { UserStatus, UserType } from "src/utils/enum";
import { Comment } from "./comment.schema";
import { Product } from "./product.schema";


export type UserDocument = Document & User



export class CarrierDetail  {
  @Prop({type: mongoose.Types.ObjectId, ref: 'products'})
  product: Product
  @Prop()
  unit: number
  @Prop({type: [{Comment}]}) 
  returnedProduct: Comment[]

}
export class Location  {
  @Prop()
  lat: string
  @Prop()
  lng: string
}

@Schema({timestamps: true})
export class User  {
    @Prop()
    shopName: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({ enum: UserType,  required: true })
    type: UserType[];

    @Prop({ type: String, enum: UserStatus,  required: true })
    status: UserStatus;

    @Prop()
    location?: Location

    @Prop({type: [User]})
    carriers?: User[]

    @Prop()
    carrierDetail?: CarrierDetail



}

export const UserSchema = SchemaFactory.createForClass(User)