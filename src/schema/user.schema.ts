import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserStatus, UserType } from "src/utils/enum";


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

    @Prop({type: String ,enum: UserType,  required: true, default: UserType.user})
    type: UserType;

    @Prop({ type: String, enum: UserStatus,  required: true })
    status?: UserStatus;

}

export const UserSchema = SchemaFactory.createForClass(User)