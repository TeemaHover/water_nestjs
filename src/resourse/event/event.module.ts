import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Event, EventSchema } from "src/schema";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";



@Module({
    imports: [ MongooseModule.forFeature([{name: Event.name, schema: EventSchema},])],
    controllers: [EventController],
    providers: [ EventService],
    exports: [ ]
})

export class EventModule {}