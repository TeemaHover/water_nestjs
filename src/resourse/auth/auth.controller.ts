import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserStatus, UserType } from 'src/utils/enum';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
  ) {}
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      let user = await this.service.validateUser(dto.phone);
      if (user) throw new HttpException('registered user', HttpStatus.FOUND);
      const hashed = await bcrypt.hash(dto.password, 10);
  
        user = await this.model.create({
          lastName: dto.lastName,
          firstName: dto.firstName,
          phone: dto.phone,
          userStatus: UserStatus.active,
          userType: UserType.user,
          password: hashed,
        });
      
      const token = await this.service.signPayload(user.phone);
      return {  token };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.service.signIn(dto.phone, dto.password)
  }


}
