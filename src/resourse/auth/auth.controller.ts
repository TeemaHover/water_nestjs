import { Body, Controller, Post } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { BusinessDto, LoginDto, PanelistDto, UserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  
  @Post('user')
  async registerUser(@Body() dto: UserDto) {
    try {
      return this.service.registerUser(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  @Post('business')
  async registerBusiness(@Body() dto: BusinessDto) {
    try {
      return this.service.registerBusiness(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  @Post('panelist')
  async registerPanelist(@Body() dto: PanelistDto) {
    try {
      return this.service.registerPanelist(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }


}
