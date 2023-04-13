import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "src/schema";
import { ProductDto } from "./product.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}


  async create(dto:ProductDto , id: string) {
    try {
      return await this.model.create({
        business: id,
        barcode: dto.barcode,
        productName: dto.productName,
        price: dto.price,
        categoryId: dto.categoryId,
        unit: dto.unit,
        minUnit: dto.minUnit,
        images: dto.images
      })
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

  async update(dto: ProductDto, id: string) {
    try {
      let order = await this.model.updateOne({'_id': id}, {
        $set: {
          barcode: dto.barcode, 
          price: dto.price, 
          productName: dto.productName, 
          categoryId: dto.categoryId, 
          unit: dto.unit, 
          minUnit: dto.minUnit, 
          images: dto.images
        }
      })
      if(order) {
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

  async view() {
    try {
      return await this.model.find()
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }

  async viewForBusiness(userId: string) {
    try {
      return await this.model.find({business: userId})
    } catch (error) {
      throw new HttpException(error.message, 500)
      console.error(error)
    }
  }
}