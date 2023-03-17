import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Put,
    Query, Request, UseGuards
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { UserAccessGuard } from 'src/guard/auth.guard';
import { User, UserDocument } from 'src/schema';
import { UserStatus, UserType } from 'src/utils/enum';
import { RatingService } from './rating.service';
import { AvailableDay, LawyerDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class UserController {
  constructor(
    private readonly service: UserService,
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly ratingService: RatingService,
  ) {}

  @Put('/:id')
  @ApiParam({ name: 'id' })
  @ApiQuery({ name: 'status' })
  async updateUserStatus(
    @Request() { user },
    @Param('id') id: string,
    @Query('status') status: UserStatus,
  ) {
    if (!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED);
    if (user.userType == UserType.admin) {
      let updateUser = await this.service.getUserById(id);
      updateUser.userStatus = status;
      updateUser.save();
      return true;
    }
    return false;
  }

  @Get('me')
  getUser(@Request() {user}) {
    return this.service.getUserById(user['_id'])
  }

  @Get('/:id')
  @ApiQuery({ name: 'comment' })
  @ApiQuery({ name: 'rating' })
  async giveRating(
    @Request() { user },
    @Param('id') id: string,
    @Query('comment') comment: string,
    @Query('rating') rating: number,
  ) {
    if (!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED);
    try {
      
      let lawyer = await this.service.getUserById(id);
      if (!lawyer ) return false;

      let createdRating = await this.ratingService.createRating(
        user['_id'],
        comment,
        rating,
      );
      if (!createdRating ) return false;
      let avg =
        lawyer.rating.length > 0
          ? Math.round(((Number(lawyer.ratingAvg) * Number(lawyer.rating.length)) + Number(rating)) / (Number(lawyer.rating.length ) + 1) * 10) / 10
          : rating;
      lawyer.rating.push(createdRating);
      lawyer.ratingAvg = avg;
      lawyer.save();
      return true;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }


  @Patch()
  async updateLawyer(@Request() {user}, @Body() dto: LawyerDto) {
    if (!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED);
    try {
        let lawyer = await this.model.findByIdAndUpdate(user['_id'], {
            experience: dto.experience,
            availableDays: dto.availableDays,
            bio: dto.bio,
            profileImg: dto.profileImg
        })
        if(!lawyer) return false
        return true
    } catch (error) {
        throw new HttpException(error, 500)
    }
  }

  @Patch('available')
  async updateLawyerAvailableDays(@Request() {user}, @Body() dto: Array<AvailableDay >) {
      if (!user) throw new HttpException('error', HttpStatus.UNAUTHORIZED);
    try {
        
            let days = await this.model.updateOne({'_id': user['_id']}, {
                $addToSet: {availableDays: dto}
            })
            return days
       
    
    } catch (error) {
        throw new HttpException(error, 500)
    }
  }
}
