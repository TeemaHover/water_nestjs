import { Body, Controller, Get, Post } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventDto } from './event.dto';
import { EventService } from './event.service';

@Controller('event')
@ApiTags('Event')
export class EventController {
  constructor(private readonly service: EventService) {}
  
  @Roles(UserType.business)
  @Post()
   createEvent(@Body() dto: EventDto) {
    try {
      return this.service.createEvent(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
   getVoluntary() {
    try {
      return this.service.getEvent()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  


}
