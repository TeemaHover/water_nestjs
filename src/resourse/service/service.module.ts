import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { Service, ServiceSchema } from "src/schema";
import { ServiceController } from "./service.controller";

@Module({
    imports: [ MongooseModule.forFeature([{name: Service.name, schema: ServiceSchema}])],
    controllers: [ServiceController],
    providers: [],
    exports: []
})

export class ServiceModule {}