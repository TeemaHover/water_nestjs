import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Business, BusinessSchema, Event, EventSchema, User, UserSchema } from "src/schema";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";



@Module({
    imports: [ MongooseModule.forFeature([{name: Event.name, schema: EventSchema}, {name: User.name, schema: UserSchema},  {name: Business.name, schema: BusinessSchema}])],
    controllers: [EventController],
    providers: [ EventService,],
    exports: [ ]
})

export class EventModule {}