import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { CommentDto } from "./comment.dto";

@Controller('comment')
@ApiTags('Comment')
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class CommentController {
  constructor(@InjectModel(Comment.name) private model: Model<CommentDocument>) {}

  @Post()
  async create(@Request() {user}, @Body() dto: CommentDto) {
    try {
      if(user['type'] != UserType.user || user['type'] != UserType.shop) throw new HttpException('error', 401)
      return await this.model.create({
        user: user['_id'],
        carrier: dto.carrier,
        business: dto.business,
        problem: dto.problem,
        product: dto.product,
        message: dto.message,
        order: dto.order,
      })
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

  @Get()
  async view(@Request() {user}) {
    try {
      if( user['type'] != UserType.business ) throw new HttpException('error', 401)
      return this.model.find({business: user['_id']})
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

}