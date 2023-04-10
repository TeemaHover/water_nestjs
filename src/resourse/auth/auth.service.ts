
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.userService.validateUser(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { phone: user.phone };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
