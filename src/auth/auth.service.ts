import { ForbiddenException, Injectable} from '@nestjs/common';
import * as argon from 'argon2';
import {PrismaService} from "@/prisma/prisma.service";
import {SigninDto, SignupDto} from "./dto";
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
  }

  async login(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {email: dto.email}, select: {
        email: true,
        id: true,
        hash: true,
        profile: true,
      }
    });
    if (!user) throw new ForbiddenException("Email is not registered");

    const isPassMatch = await argon.verify(user.hash, dto.password);
    if (!isPassMatch) throw new ForbiddenException("Incorrect password");

    delete user.hash;
    if (!user.profile.length)
      throw new ForbiddenException("Incorrect profile");

    return this.signToken(user.id, user.profile![0].id);
  }

  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      //first create user
      let user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })

      //create default profile
      let name = dto.name.trim();
      if (!name) {
        name = `${dto.email.split("@")[0]}-${(Math.random() * 100).toString()}`;
      }
      const profile = await this.prisma.profile.create({
        data: {
          userId: user.id,
          name
        }
      })

      console.log({dto});
      return this.signToken(user.id, profile.id);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Credentials are taken');
        }
      }

      throw error;
    }
  }

  async signToken(userId: string, profileId: string) {
    const payload = {
      sub: userId,
      profile: profileId,
    }

    const secret = this.config.get('JWT_SECRET');
    //const expiresIn =  this.config.get('EXPIRES_IN');
    const token =  await this.jwt.signAsync(payload, {/*expiresIn,*/secret});

    return {'access_token':token};
  }

  validatePhoneNumber(number: string) {
    console.log("validate number --> ", number);
    const regexp = new RegExp(/\D+/, 'gi');
    let clearNumber = number.replaceAll(regexp, "").trim();
    return clearNumber.length > 6;
  }
}
