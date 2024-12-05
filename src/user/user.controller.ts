import {Body, Controller, ForbiddenException, Get, Param, Patch, UseGuards, UsePipes} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {GetProfile} from "../decorator";
import {EditProfileDto, editProfileSchema} from "./dto";
import {UserProfile} from "../types";
import {ZodValidationPipe} from "../pipes/zodValidationPipe";
import {UserService} from "./user.service";


@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@GetProfile() profile: UserProfile) {
    return profile;
  }

  @Patch('profile/:id')
  editProfile(@Param('id') id: string, @Body(new ZodValidationPipe(editProfileSchema)) dto: EditProfileDto, @GetProfile() profile: UserProfile) {
    if (id === 'me') {
        console.log("controller profile --> ", JSON.stringify(profile, null, 2));
        return this.userService.updateProfileById(profile.id, dto);
      } else {
        throw new ForbiddenException("only admin could edit other profiles");
      }
  }
}
