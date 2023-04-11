
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(    private userService: UserService,    private jwtService: JwtService  ) {}

  async login(dto: LoginDto) {
    const user = await this.userService.validateUser(dto.phone);
    const check = await bcrypt.compare(dto.password, user?.password)
    if (!check) {
      throw new UnauthorizedException();
    }
    const payload = { phone: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async register(dto: RegisterDto) {
    
    let user = await this.userService.validateUser(dto.phone);
    if(user) throw new HttpException('registered user', HttpStatus.FOUND)
    user = await this.userService.createUser(dto)
    
    const payload = { phone: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
