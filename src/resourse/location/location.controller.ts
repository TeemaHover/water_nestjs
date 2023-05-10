import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { LocationDto } from './location.dto';
import { LocationService } from './location.service';

@Controller('location')
@ApiTags('Location')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')

export class LocationController {
  constructor(private readonly service: LocationService) {}
  
  @Roles(UserType.system)
  @Post()
  createLocation(@Body() dto: LocationDto) {
    try {
      return this.service.createLocation(dto)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  getLocation() {
    try {
      return this.service.getLocation()
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }
  


}
