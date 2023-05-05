
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BusinessService } from '../user/business.service';
import { PanelistService } from '../user/panelist.service';
import { UserService } from '../user/user.service';
import { BusinessDto, LoginDto, PanelistDto, UserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(    private userService: UserService, private panelistService: PanelistService, private businessService: BusinessService,    private jwtService: JwtService  ) {}

  async login(dto: LoginDto) {
    let user = await this.userService.validateUser(dto.phone);
    if(!user) user = await this.panelistService.validatePanelist(dto.phone);
    if(!user) user = await this.businessService.validateBusiness(dto.phone);
    if(!user) return {
      type: false,
    }
    const check = await bcrypt.compare(dto.password, user?.password)
    if (!check) {
      throw new UnauthorizedException();
    }
    const payload = { phone: user.phone };
    return {
      type: user.type,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  
  async registerUser(dto: UserDto) {
    
    let user = await this.userService.validateUser(dto.phone);
    if(user) throw new HttpException('registered user', HttpStatus.FOUND)
    user = await this.userService.createUser(dto)
    
    const payload = { phone: user.phone };
    return {
      type: user.type,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async registerBusiness(dto: BusinessDto) {
    
    let user = await this.businessService.validateBusiness(dto.phone);
    if(user) throw new HttpException('registered panelist', HttpStatus.FOUND)
    user = await this.businessService.createBusiness(dto)
    
    const payload = { phone: user.phone };
    return {
      type: user.type,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async registerPanelist(dto: PanelistDto) {
    
    let user = await this.panelistService.validatePanelist(dto.phone);
    if(user) throw new HttpException('registered business', HttpStatus.FOUND)
    user = await this.panelistService.createPanelist(dto)
    
    const payload = { phone: user.phone };
    return {
      type: user.type,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
