import {
  Controller,
  Get,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserService } from './user.service';




@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
  getData(@Request() {user}) {
    return user
  }

  @Get()
  @Roles(UserType.business)
  asdf() {
    return 'asdf'
  } 


}
