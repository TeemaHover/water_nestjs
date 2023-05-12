import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserService } from '../user/user.service';
import { EventDto } from './event.dto';
import { EventService } from './event.service';

@Controller('event')
@ApiTags('Event')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class EventController {
  constructor(
    private readonly service: EventService,
    private readonly user: UserService,
  ) {}

  @Roles(UserType.business)
  @Post()
  createEvent(@Request() { user }, @Body() dto: EventDto) {
    return this.service.createEvent(dto, user['_id']);
  }

  @Get()
  getEvent() {
    return this.service.getEvent();
  }

  @Get(':id')
  getEventByBusiness(@Param('id') id: string, @Request() { user }) {
    return this.service.getEventByBusiness(id, user['type']);
  }
  @Roles(UserType.user)
  @Get('member/:id')
  @ApiParam({ name: 'id' })
  addMemberEvent(@Request() { user }, @Param('id') id: string) {
    let event = this.service.addMemberEvent(id, user['_id']);
    if (event) {
      this.user.addXp(user['_id']);
    }
    return event;
  }
}
