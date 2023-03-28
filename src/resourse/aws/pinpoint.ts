import { Injectable } from "@nestjs/common/decorators";
import { HttpException } from "@nestjs/common/exceptions";
import { Pinpoint } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import appConfig from "src/config/app.config";
@Injectable()
export class AwsPinpoint {
  constructor(@InjectAwsService(Pinpoint) private readonly pinpoint: Pinpoint) {}
  async sendOtp() {
    
    try {
      
      await this.pinpoint.sendOTPMessage({ApplicationId: appConfig().awsId, SendOTPMessageRequestParameters: {Channel: "SMS", BrandName: 'CreateAccount', CodeLength: 4, ValidityPeriod: 15, AllowedAttempts: 3, Language: "en-US", OriginationIdentity: '+13434531363', DestinationIdentity: '+97688666515',ReferenceId: 'asdf' } },function(err, data)  {
        console.log(data)
        console.log(err)
      } )
      
      
      return true
      
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
  async verifyOtp( otp: string) {
    try {
      let res = this.pinpoint.verifyOTPMessage({ApplicationId: appConfig().awsId, VerifyOTPMessageRequestParameters: {'DestinationIdentity':'+97688301158', 'Otp': otp, 'ReferenceId': 'asdf' }})
      console.log(res)
      return res
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }
}