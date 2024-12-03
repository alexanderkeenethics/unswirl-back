import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {

  async sendVerificationCode(phone: string, code: string) {
    console.log("start sending --> ", phone, code);
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log("end sending --> ");
  }
}
