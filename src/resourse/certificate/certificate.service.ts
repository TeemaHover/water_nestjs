import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Certificate, CertificateDocument } from "src/schema";
import { CertificateDto } from "./certificate.dto";
@Injectable() 
export class CertificateService {
  constructor(@InjectModel(Certificate.name) private readonly model: Model<CertificateDocument>) {}
  async createCertificate(dto: CertificateDto) {
    try {
      return await this.model.create(dto)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getCertificate() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}