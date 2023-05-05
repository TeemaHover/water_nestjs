import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { UserRank, UserStatus, UserType } from "src/utils/enum";
import { Certificate } from "./certificate.schema";
import { Location } from "./location.schema";


export type UserDocument = Document & User



@Schema({timestamps: true})
export class User  {
    @Prop()
    firstName?: string

    @Prop()
    lastName?: string

    @Prop({required: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({default: 0})
    xp?: number

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Location'})
    location?: Location

    @Prop({default: 0})
    point?: number

    @Prop({type: String, enum: UserRank, default: UserRank.bronze})
    rank?: UserRank
    
    @Prop({type: String ,enum: UserType,  required: true, default: UserType.user})
    type?: UserType;

    @Prop([Certificate])
    certificates?: Certificate[]

    @Prop({ type: String, enum: UserStatus,  required: true })
    status?: UserStatus;

}

export const UserSchema = SchemaFactory.createForClass(User)