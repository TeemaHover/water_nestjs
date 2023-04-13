import { Body, Controller, Get, Param, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { S3Service } from "../aws/s3.service";
import { ProductDto } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('product')
@ApiTags("Product")
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class ProductController {
  constructor(private service: ProductService, private s3Service: S3Service) {}

  @Roles(UserType.business)
  @Post('uploadFields')
  @ApiOperation({ description: 'upload images' })
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'images',
        maxCount: 20,
      },
    ]),
  )
  async uploadMultipleFiles(
    @Request() { user },
    @UploadedFiles() files: { images?: Express.Multer.File[] },
  ) {
    let imagesUrl = [];
    for (let i = 0; i < (files?.images?.length ?? 0); i++) {
      const key = `${files.images[i].originalname}${Date.now()}`;
      const imageUrl = await this.s3Service.uploadFile(files.images[i], key);
      await imagesUrl.push(imageUrl);
    }
    return imagesUrl;
  }

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

  @Put('/:id')
  @Roles(UserType.business)
  @ApiParam({name: 'id'})
  updateProduct(@Request() {user}, @Param('id') id, @Body()  dto: ProductDto) {
    return this.service.update(dto, id)
  }

  
}