import { Controller, Get, Param } from "@nestjs/common/decorators";
import { ApiParam } from "@nestjs/swagger";
import { AwsPinpoint } from "./pinpoint";

@Controller('Aws')
export class AwsController {
  constructor(private readonly pinpoint: AwsPinpoint) {}

  @Get()
  sendOtp() {
    return this.pinpoint.sendOtp()
  }
  @Get('verify/:otp')
  @ApiParam({name: 'otp'})
  verifyOtp(@Param('otp') otp: string) {
    return this.pinpoint.verifyOtp(otp)
  }
}