import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {UserProfile} from "@/types";

export const GetProfile = createParamDecorator((data:string|undefined, ctx: ExecutionContext): UserProfile=> {
  const request = ctx.switchToHttp().getRequest();
  if (data) {
    return request.user[data];
  }

  return request.user;
});
