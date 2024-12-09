import {Body, Controller, Post} from '@nestjs/common';
import {InitialChatDto, initialChatSchema} from "./dto";
import {ChatService} from "@/chat/chat.service";
import {ZodValidationPipe} from "@/pipes/zodValidationPipe";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('public')
  sendChatMessage(@Body(new ZodValidationPipe(initialChatSchema)) dto: InitialChatDto) {
    return this.chatService.startInitialChat(dto);
  }
}
