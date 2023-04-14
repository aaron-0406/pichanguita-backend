import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class SmsService {
  private sns: AWS.SNS;
  constructor() {
    this.sns = new AWS.SNS();
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    console.log(process.env.AWS_REGION);
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }
  async sendSMS(message: string, phoneNumber: string): Promise<void> {
    const params = {
      Message: message,
      PhoneNumber: phoneNumber,
    };
    await this.sns.publish(params).promise();
  }
}
