import {
  Controller,
  Get,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from '../auth/auth.guard';
import { UserService } from './user.service';




@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly service: UserService) {}
  
  @Get('me')
  getData(@Request() {user}) {
    return user
  }



}
