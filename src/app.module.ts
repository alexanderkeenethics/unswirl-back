import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {PrismaModule} from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, PrismaModule, UserModule, VerificationModule, RedisModule, SmsModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
