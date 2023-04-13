import { Body, Controller, Get, HttpException, Param, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserType } from "src/utils/enum";
import { UserAccessGuard } from "../auth/auth.guard";
import { S3Service } from "../aws/s3.service";
import { ProductDto } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('product')
@ApiTags("Product")
@UseGuards(UserAccessGuard)
@ApiBearerAuth('access-token')
export class ProductController {
  constructor(private service: ProductService, private s3Service: S3Service) {}


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
    if( user['type'] != UserType.business  ) throw new HttpException('error', 401)
    let imagesUrl = [];
    for (let i = 0; i < (files?.images?.length ?? 0); i++) {
      const key = `${files.images[i].originalname}${Date.now()}`;
      const imageUrl = await this.s3Service.uploadFile(files.images[i], key);
      await imagesUrl.push(imageUrl);
    }
    return imagesUrl;
  }

  // @Roles(UserType.business)
  @Post()
  create(@Request() {user}, @Body() dto: ProductDto) {
    if( user['type'] != UserType.business ) throw new HttpException('error', 401)
   
    return this.service.create(dto, user['_id'])
  }

  @Get()
  view() {
    return this.service.view()
  }

  @Get('barcode/:code')
  @ApiParam({name:  'code'})
  viewByBarcode(@Param('code') code: string) {
    return this.service.viewByBardcode(Number.parseInt(code))
  }

  @Get("business")
  
  viewForBusiness(@Request() {user}) {
    if( user['type'] != UserType.business ) throw new HttpException('error', 401)
    return this.service.viewForBusiness(user['_id'])
  }

  @Put('/:id')
  
  @ApiParam({name: 'id'})
  updateProduct(@Request() {user}, @Param('id') id, @Body()  dto: ProductDto) {
     if( user['type'] != UserType.business ) throw new HttpException('error', 401)
    return this.service.update(dto, id)
  }

  
}