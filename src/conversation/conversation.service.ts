import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ConversationRepository } from './conversation.repository';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class ConversationService {
  constructor(
    private conversationRepository: ConversationRepository,
    private chatService: ChatService,
  ) {}

  async createConversation(
    userId: string,
    createConversationDto: CreateConversationDto,
  ) {
    const { prompt, summary } = createConversationDto;
    const conversations =
      await this.conversationRepository.getConversationsByUserId(userId);
    const dataAI = await this.chatService.chat(prompt, conversations, summary);
    const createdConversation =
      await this.conversationRepository.createConversation(
        userId,
        prompt,
        dataAI,
      );
    return { data: createdConversation, message: 'Conversation created' };
  }

  async getConversationsByUserId(userId: string) {
    const conversations =
      await this.conversationRepository.getConversationsByUserId(userId);
    return {
      data: conversations,
      message: 'Conversations fetched successfully',
    };
  }
}
