import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { APP_GUARD } from '@nestjs/core';
import appConfig from "src/config/app.config";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";

import { UserAccessGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./roles.guard";



@Module({
    imports: [
        UserModule,
        JwtModule.register({
        global: true,
        secret:  appConfig().appSecret,
    }), ],
    controllers: [AuthController],
    providers: [AuthService, {provide: APP_GUARD, useClass: UserAccessGuard,}, {provide: APP_GUARD, useClass: RolesGuard,}],
    exports: [AuthService]
    
})

export class AuthModule {}