import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    return this.prisma.profile.findUnique({
      where: {id: payload.profile, userId: payload.sub},
      select:{
        name: true,
        bio: true,
        user: {
          select:{
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
  }
}
