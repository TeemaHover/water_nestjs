import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema';
import { UserStatus, UserType } from 'src/utils/enum';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly service: UserService,
  ) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      let user = await this.service.validateUser(dto.phone);
      if (user) throw new HttpException('registered user', HttpStatus.FOUND);
      const hashed = await bcrypt.hash(dto.password, 10);
      if (dto.userType == UserType.user) {
        user = await this.model.create({
          lastname: dto.lastname,
          firstname: dto.firstname,
          phone: dto.phone,
          userStatus: UserStatus.active,
          userType: UserType.user,
          password: hashed,
        });
      } else {
        if (dto.userType == UserType.lawyer) {
          user = await this.model.create({
            lastname: dto.lastname,
            firstname: dto.firstname,
            phone: dto.phone,
            userStatus: UserStatus.pending,
            userType: UserType.lawyer,
            password: hashed,
            bio: dto.bio,
            experience: dto.experience,
            profileImg: dto.profileImg,
          });
        }
      }
      const token = await this.service.signPayload(user.phone);
      return { user, token };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  @Post('login')
  async login(@Body() dto: LoginDto) {
    let user = await this.service.validateUser(dto.phone);
    if (!user) throw new HttpException('wrong phone', HttpStatus.FORBIDDEN);
    const checkPassword = this.checkPassword(dto.password, user.password);
    if (checkPassword) {
      const token = await this.service.signPayload(user.phone);
      return { user, token };
    } else {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
  }

  // @Delete()
  // async delete() {
  //   return this.service.deleteAllUser();
  // }

  async checkPassword(password: string, checkPassword: string) {
    bcrypt.compare(password, checkPassword, (err, result) => {
      if (result) {
        return true;
      } else {
        return false;
      }
    });
  }
}
