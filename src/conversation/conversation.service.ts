import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { ConversationRepository } from './conversation.repository';

@Injectable()
export class ConversationService {
  constructor(private conversationRepository: ConversationRepository) {}

  async createConversation(
    userId: string,
    createConversationDto: CreateConversationDto,
  ) {
    const { prompt, summary } = createConversationDto;
    //handler ai
    const contentAi: string = 'Conent ai nhes';
    const createdConversation =
      await this.conversationRepository.createConversation(
        userId,
        prompt,
        contentAi,
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
