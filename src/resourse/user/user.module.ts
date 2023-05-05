import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema, Panelist, PanelistSchema, User, UserSchema } from "src/schema";
import { BusinessService } from "./business.service";
import { PanelistService } from "./panelist.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";




@Global()
@Module({
    imports: [ MongooseModule.forFeature([{name: User.name, schema: UserSchema},{name: Panelist.name, schema: PanelistSchema}, {name: Business.name, schema: BusinessSchema} ])],
    controllers: [UserController],
    providers: [UserService, PanelistService, BusinessService],
    exports: [UserService, PanelistService, BusinessService]
})

export class UserModule {}