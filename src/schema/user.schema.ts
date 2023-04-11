import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { UserStatus, UserType, WorkStatus } from "src/utils/enum";
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

    @Prop()
    registerNumber: string
    @Prop()
    companyRegisterNumber: string

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({type: String ,enum: UserType,  required: true })
    type: UserType;

    @Prop({ type: String, enum: UserStatus,  required: true })
    status: UserStatus;

    @Prop()
    location?: Location

    @Prop({type: MongooseSchema.Types.Array})
    carriers?: User[]

    @Prop()
    carrierDetail?: CarrierDetail

    @Prop({ type: String, enum: WorkStatus,  required: true })
    jobStatus: WorkStatus;



}

export const UserSchema = SchemaFactory.createForClass(User)