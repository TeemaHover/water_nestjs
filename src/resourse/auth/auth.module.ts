import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { APP_GUARD } from '@nestjs/core';
import { UserModule } from "../user/user.module";
import { jwtConstants } from "./auth.const";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { RolesGuard } from "./roles.guard";



@Module({
    imports: [
        UserModule,
        JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '1d'}
    }), ],
    controllers: [AuthController],
    providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard,}, {provide: APP_GUARD, useClass: RolesGuard,}],
    exports: [AuthService]
    
})

export class AuthModule {}