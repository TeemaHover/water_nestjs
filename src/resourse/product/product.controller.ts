import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { ProductDto } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('product')
@ApiTags("Product")
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class ProductController {
  constructor(private service: ProductService) {}

  @Roles(UserType.business)
  @Post()
  create(@Body() dto: ProductDto) {
    return this.service.create(dto)
  }

  @Get()
  view() {
    return this.service.view()
  }

  @Get("business")
  @Roles(UserType.business)
  viewForBusiness(@Request() {user}) {
    return this.service.viewForBusiness(user['_id'])
  }

}