import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Certificate, CertificateSchema } from "src/schema";
import { CertificateController } from "./certificate.controller";
import { CertificateService } from "./certificate.service";



@Module({
    imports: [ MongooseModule.forFeature([{name: Certificate.name, schema: CertificateSchema},])],
    controllers: [CertificateController],
    providers: [ CertificateService],
    exports: [ ]
})

export class CertificateModule {}