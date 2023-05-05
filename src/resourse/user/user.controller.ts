import {
  Controller,
  Get,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAccessGuard } from '../auth/auth.guard';
import { BusinessService } from './business.service';
import { PanelistService } from './panelist.service';
import { UserService } from './user.service';




@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')

export class UserController {
  constructor(private readonly user: UserService, private readonly panelist: PanelistService, private readonly business: BusinessService ) {}

  @Get('me')
  getData(@Request() {user}) {
    return user
  }




}
