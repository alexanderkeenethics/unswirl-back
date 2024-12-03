import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {RedisService} from "../redis/redis.service";

@Injectable()
export class VerificationService {
  constructor(private readonly redis: RedisService) {}
  generateVerificationCode() {
    return crypto.randomInt(1000, 9999).toString();
  }

  async saveCode(phone: string, code: string): Promise<void> {
    const key = `verification:${phone}`;
    await this.redis.set(key, code, 300); // Expires in 5 minutes
  }

  async validateCode(phone: string, code: string): Promise<boolean> {
    const key = `verification:${phone}`;
    const savedCode = await this.redis.get(key);

    if (savedCode === code) {
      await this.redis.del(key); // Delete the code after successful validation
      return true;
    }
    return false;
  }
}
