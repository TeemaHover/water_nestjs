import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import appConfig from "src/config/app.config";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";

@Global()
@Module({
    imports: [
        UserModule,

        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: appConfig().appSecret,
                }
            },
            inject: [ConfigService]
            
    }), ],
    controllers: [AuthController],
    providers: [AuthService, ],
    exports: [AuthService]
    
})

export class AuthModule {}