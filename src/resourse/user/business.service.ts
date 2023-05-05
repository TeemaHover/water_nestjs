import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Model } from 'mongoose';
import appConfig from "src/config/app.config";
import { Business, BusinessDocument } from "src/schema";
import { BusinessDto } from "../auth/auth.dto";
@Injectable() 
export class BusinessService {
  constructor(@InjectModel(Business.name) private readonly model: Model<BusinessDocument>) {}
  async signPayload(payload) {
    return sign({ name: payload }, appConfig().appSecret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }
  async validateBusiness(payload: string){
  
    return await this.model.findOne({ phone: payload });
  }


  async createBusiness(dto: BusinessDto) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);
      let user = await this.model.create({
        companyName: dto.companyName,
        companyRegisterNumber: dto.companyRegisterNumber,
        registerNumber: dto.registerNumber,
        password: hashed,
        status: dto.status,
        phone: dto.phone,
        type: dto.type,
      })
     
      return user 
    } catch (error) {
      throw new HttpException(error, 500);
      console.error(error)
    }
  }
}