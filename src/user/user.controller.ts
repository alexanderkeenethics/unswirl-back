import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import Request from 'express';
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Req() req: Request) {
    //console.log(JSON.stringify({user: req.user}, null, 2));
   console.log(JSON.stringify(req['user'], null, 2));
    return req['user'];
  }
}
