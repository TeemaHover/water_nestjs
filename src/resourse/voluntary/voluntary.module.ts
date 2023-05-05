import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Voluntary, VoluntarySchema } from "src/schema";
import { VoluntaryController } from "./voluntary.controller";
import { VoluntaryService } from "./voluntary.service";



@Module({
    imports: [ MongooseModule.forFeature([{name: Voluntary.name, schema: VoluntarySchema},])],
    controllers: [VoluntaryController],
    providers: [ VoluntaryService],
    exports: [ ]
})

export class VoluntaryModule {}