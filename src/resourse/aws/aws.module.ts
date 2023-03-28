import { Module } from '@nestjs/common';
import { Pinpoint } from 'aws-sdk';

import { AwsSdkModule } from 'nest-aws-sdk/dist/lib/aws.module';
import { AwsController } from './aws.controller';
import { AwsPinpoint } from './pinpoint';


@Module({
  imports: [AwsSdkModule.forFeatures([ Pinpoint])],
  controllers: [AwsController],
  providers: [ AwsPinpoint],
  exports: [ AwsPinpoint],
})
export class AwsModule {}