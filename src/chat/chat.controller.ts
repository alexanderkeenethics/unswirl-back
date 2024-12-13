import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {InitialChatDto, initialChatSchema} from "./dto";
import {ChatService} from "@/chat/chat.service";
import {ZodValidationPipe} from "@/pipes/zodValidationPipe";
import {AuthGuard} from "@nestjs/passport";
import {GetProfile} from "@/decorator";
import {UserProfile} from "@/types";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('public')
  sendChatMessage(@Body(new ZodValidationPipe(initialChatSchema)) dto: InitialChatDto) {
    return this.chatService.sendMessage(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("tasks")
  getTasks(@GetProfile() profile: UserProfile) {
    return this.chatService.receiveTasks(profile.sessionId);
  }
}
