import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import appConfig from 'src/config/app.config';
import { User, UserDocument } from 'src/schema/user.schema';
import { UserDto } from '../auth/auth.dto';
import { UserStatus, UserType } from 'src/utils/enum';

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
        firstName: dto.firstName,
        password: hashed,
        status: UserStatus.active,
        phone: dto.phone,
        type: UserType.user,
      });

      return user;
    } catch (error) {
      throw new HttpException(error, 500);
      console.error(error);
    }
  }
  async addXp(id: string) {
    try {
      await this.model.findByIdAndUpdate(id, { $inc: { xp: 1 } });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
