import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rating, RatingDocument } from "src/schema/rating.schema";
import { RatingDto } from "./user.dto";

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private model: Model<RatingDocument>) {}
  
  async createRating(clientId: string, comment: string, r: number) {
    try {
      let rating = await this.model.create({
        clientId: clientId,
        comment: comment,
        rating: r
      })
      return rating
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

}