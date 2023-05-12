import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';

import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserType } from 'src/utils/enum';
import { UserAccessGuard } from '../auth/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { InfoDto, VoluntaryDto } from './voluntary.dto';
import { VoluntaryService } from './voluntary.service';

@Controller('voluntary')
@ApiTags('Voluntary')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class VoluntaryController {
  constructor(private readonly service: VoluntaryService) {}

  @Roles(UserType.system)
  @Post()
  createVoluntary(@Body() dto: VoluntaryDto) {
    try {
      return this.service.createVoluntary(dto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  @Roles(UserType.business)
  getVoluntary() {
    try {
      return this.service.getVoluntary();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get('rank/:rank')
  @ApiParam({ name: 'rank' })
  async getInfo(@Param('rank') rank: string) {
    let info = [];
    await this.service.getInfo(rank).then((d) => {
      if (d.length > 0) {
        info = d[0].info;
      } else {
        info = [];
      }
    });
    return info;
  }

  @Post('info/:id')
  @ApiParam({ name: 'id' })
  @Roles(UserType.system)
  addInfo(@Param('id') id: string, @Body() dto: InfoDto) {
    return this.service.addInfo(id, dto);
  }
}
