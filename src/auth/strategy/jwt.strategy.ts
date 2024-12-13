import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "@/prisma/prisma.service";
import {UserService} from "@/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    return this.userService.getProfileById(payload.profile, payload.sub);
  }
}
