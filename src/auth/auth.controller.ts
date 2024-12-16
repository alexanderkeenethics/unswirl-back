import {Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthTokenDto, SigninDto, SignupDto} from "./dto";
import {VerificationService} from "@/verification/verification.service";
import {SmsService} from "@/sms/sms.service";
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SendCodeRequestBodyDto, ValidationCodeDto, VerifyCodeRequestBodyDto} from "@/auth/dto/verificationCode.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private verification: VerificationService, private sms: SmsService) {
  }

  @Post('signup')
  @ApiOperation({summary: 'Create new user'})
  @ApiCreatedResponse({description: 'User created successfully', type: AuthTokenDto})
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({summary: 'Login existing user'})
  @ApiResponse({description: 'User login successfully', type: AuthTokenDto, status: HttpStatus.OK})
  signin(@Body() dto: SigninDto) {
    return this.authService.login(dto)
  }

  @Post('phone/send-code')
  @HttpCode(200)
  @ApiOperation({summary: 'Send SMS with verification code to user\'s phone'})
  @ApiResponse({description: 'The verification code was successfully sent', type: ValidationCodeDto, status: HttpStatus.OK})
  async sendCode(@Body() {phone}: SendCodeRequestBodyDto) {
    const result: { message: string; code?: string } = {
      message: ''
    };

    try {
      if (!this.authService.validatePhoneNumber(phone)) {
        throw new Error('Invalid phone number');
      }

      const code = this.verification.generateVerificationCode();
      await this.verification.saveCode(phone, code);
      await this.sms.sendVerificationCode(phone, code);
      result.message = 'Code sent successfully';
      result.code = code;

      return result;
    } catch (error) {
      throw new HttpException(error instanceof Error ? error.message : 'An unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('phone/verify-code')
  @HttpCode(200)
  @ApiOperation({summary: 'Check validation code from SMS'})
  @ApiResponse({description: 'The verification code was successfully sent', type: ValidationCodeDto, status: HttpStatus.OK})
  async verifyCode(@Body() {phone, code}: VerifyCodeRequestBodyDto) {
    const isValid = await this.verification.validateCode(phone, code);
    if (isValid) {
      return 'Phone number verified';
    }

    throw new HttpException('Invalid or expired code', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
