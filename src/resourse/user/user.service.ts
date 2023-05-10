import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserDto } from '../auth/auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async signPayload(payload) {
    return sign({ name: payload }, appConfig().appSecret, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  }
  async validateUser(payload: string): Promise<User> {
  
    return await this.model.findOne({ phone: payload });
  }
  async createUser(dto: UserDto) {
    try {

      const hashed = await bcrypt.hash(dto.password, 10);
      let user = await this.model.create({
        lastName: dto.lastName,
        firstName: dto.firstName,
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
  async addXp(id: string, ) {
    try {
      await this.model.findByIdAndUpdate(id, { $inc: { xp: 1 } })
     
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
  }

  



}
