import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category, CategorySchema } from "src/schema";
import { CategoryController } from "./category.controller";

@Module({
  imports:[MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])],
  controllers: [CategoryController]
})
export class CategoryModule {}