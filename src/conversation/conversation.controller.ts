import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post(':userId')
  createConversation(
    @Param('userId') userId: string,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    return this.conversationService.createConversation(
      userId,
      createConversationDto,
    );
  }

  @Get(':userId')
  getConversationsByUserId(@Param('userId') userId: string) {
    return this.conversationService.getConversationsByUserId(userId);
  }
}
