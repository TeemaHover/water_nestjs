import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import appConfig from './config/app.config';
import { AuthModule } from './resourse/auth/auth.module';
import { CertificateModule } from './resourse/certificate/certificate.module';
import { EventModule } from './resourse/event/event.module';
import { LocationModule } from './resourse/location/location.module';
import { OrderModule } from './resourse/order/order.module';
import { PaymentModule } from './resourse/payment/payment.module';
import { UserModule } from './resourse/user/user.module';
import { VoluntaryModule } from './resourse/voluntary/voluntary.module';
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
    UserModule, AuthModule, VoluntaryModule, EventModule , CertificateModule,
    PaymentModule, OrderModule, LocationModule
    
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
