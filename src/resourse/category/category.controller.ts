import { Body, Controller, Get, HttpException, Post, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Model } from "mongoose";
import { Category, CategoryDocument } from "src/schema";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CategoryDto } from "./category.dto";

@Controller('category')
@ApiTags("Category")
@UseGuards(UserAccessGuard)
@UseGuards(RolesGuard)
@ApiBearerAuth('access-token')
export class CategoryController {
  constructor(@InjectModel(Category.name) private model: Model<CategoryDocument>) {}
  @Roles(UserType.system)
  @Post()
  async createCategory(@Body() dto:CategoryDto ) {
    try {
      return await this.model.create({
        categoryName: dto.categoryName,
        problems: dto.problems
      })
    } catch (error) {
      console.error(error)
      throw new HttpException(error.message, 500)
    }
  }

  @Get()
  async getCategories() {
    try {
      return await this.model.find()
    } catch (error) {
      console.error(error)
      throw new HttpException(error.message, 500)
    }
  }
}