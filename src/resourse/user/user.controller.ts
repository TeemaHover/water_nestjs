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
import { UserService } from './user.service';




@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly service: UserService) {}
  
  @Get('asdf')
  getData(@Request() req) {
    // console.log(req.user)
    console.log(req)
    return 'asdf'
  }


  @Get('adsfasdf')
  
  
  @Roles(UserType.system)
  getads() {
    return 'asdf'
  }
 
}
