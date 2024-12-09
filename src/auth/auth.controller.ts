import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninDto, SignupDto} from "./dto";
import {VerificationService} from "@/verification/verification.service";
import {SmsService} from "@/sms/sms.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private verification: VerificationService, private sms: SmsService) {
  }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.login(dto)
  }

  @Post('phone/send-code')
  async sendCode(@Body('phone') phone: string): Promise<{
    message: string,
    status: 'success' | 'error',
    code?: string
  }> {
    const result: { message: string; status: 'success' | 'error'; code?: string } = {
      message: '',
      status: 'error',
    };

    try {
      if (!this.authService.validatePhoneNumber(phone)) {
        throw new Error('Invalid phone number');
      }

      const code = this.verification.generateVerificationCode();
      await this.verification.saveCode(phone, code);
      await this.sms.sendVerificationCode(phone, code);
      result.message = 'Code sent successfully';
      result.status = 'success';
      result.code = code;
    } catch (error) {
      result.message = error instanceof Error ? error.message : 'An unknown error occurred';
    }

    return result;
  }

  @Post('phone/verify-code')
  async verifyCode(
      @Body('phone') phone: string,
      @Body('code') code: string,
  ): Promise<string> {
    const isValid = await this.verification.validateCode(phone, code);
    if (isValid) {
      return 'Phone number verified';
    }
    throw new Error('Invalid or expired code');
  }
}
