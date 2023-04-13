import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "src/schema";
import { CommentController } from "./comment.controller";



@Module({
    imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])],
    controllers: [CommentController],
    providers: [],
    exports: []
})

export class CommentModule {}