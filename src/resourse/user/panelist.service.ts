import { HttpException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from "src/config/app.config";

import { InjectModel } from "@nestjs/mongoose";
import { Panelist, PanelistDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { PanelistDto } from "../auth/auth.dto";

@Injectable() 
export class PanelistService {
  constructor(@InjectModel(Panelist.name) private readonly model: Model<PanelistDocument>) {}
  async signPayload(payload) {
    return sign({ name: payload }, appConfig().appSecret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }
  async validatePanelist(payload: string) {
  
    return await this.model.findOne({ phone: payload });
  }

  async createPanelist(dto: PanelistDto) {
    try {

      const hashed = await bcrypt.hash(dto.password, 10);
      let user = await this.model.create({
        companyName: dto.companyName,
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