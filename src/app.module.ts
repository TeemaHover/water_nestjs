import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { AuthModule } from './resourse/auth/auth.module';
import { AwsModule } from './resourse/aws/aws.module';
import { CategoryModule } from './resourse/category/category.module';
import { CommentModule } from './resourse/comment/comment.module';
import { OrderModule } from './resourse/order/order.module';
import { ProductModule } from './resourse/product/product.module';
import { UserModule } from './resourse/user/user.module';
@Module({
  imports: 
  
  [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),

    MongooseModule.forRoot( appConfig().dbUrl, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      dbName: appConfig().dbName
    }),
    CategoryModule,
    ProductModule,
    CommentModule,
    OrderModule,
    UserModule, AuthModule,  
    AwsModule,
    
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
