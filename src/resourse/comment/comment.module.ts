import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "src/schema";



@Module({
    imports: [MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])],
    controllers: [],
    providers: [],
    exports: []
})

export class CommentModule {}