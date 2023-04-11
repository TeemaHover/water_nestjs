import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return this.service.register(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.service.login(dto)
  }


}
