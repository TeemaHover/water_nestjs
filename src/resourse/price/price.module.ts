import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { Price, PriceSchema } from "src/schema";

import { PriceController } from "./price.controller";


@Module({
    imports: [ MongooseModule.forFeature([{name: Price.name, schema: PriceSchema}])],
    controllers: [PriceController],
    providers: [],
    exports: []
})

export class PriceModule {}