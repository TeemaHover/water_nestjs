import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema, User, UserSchema } from "src/schema";
import { UserService } from "../user/user.service";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";



@Module({
    imports: [ MongooseModule.forFeature([{name: Event.name, schema: EventSchema}, {name: User.name, schema: UserSchema}])],
    controllers: [EventController],
    providers: [ EventService, UserService],
    exports: [ ]
})

export class EventModule {}