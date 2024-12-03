import { Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy";
import {SmsModule} from "../sms/sms.module";

@Module({
  imports: [JwtModule.register({}), SmsModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
