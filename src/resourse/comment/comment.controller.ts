import { Body, Controller, Get, HttpException, Post, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { CommentDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CommentDto } from "./comment.dto";

@Controller('comment')
@ApiTags('Comment')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class CommentController {
  constructor(@InjectModel(Comment.name) private model: Model<CommentDocument>) {}

  @Roles(UserType.shop, UserType.user)
  @Post()
  create(@Request() {user}, @Body() dto: CommentDto) {
    try {
      return await this.model.create({
        user: user['_id'],
        carrier: dto.carrier,
        business: dto.business,
        problem: dto.problem,
        product: dto.product,
        message: dto.message,
      })
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }
  @Roles(UserType.business)
  @Get()
  view(@Request() {user}) {
    try {
      return this.model.find({business: user['_id']})
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

}