import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "src/schema";
import { S3Service } from "../aws/s3.service";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])],
  controllers: [ProductController],
  providers: [ProductService, S3Service]
})
export class ProductModule {}