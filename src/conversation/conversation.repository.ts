import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from './conversation.schema';
import { RoleChat } from 'src/constants';

@Injectable()
export class ConversationRepository {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async createConversation(userId: string, prompt: string, contentAi: string) {
    const createdConversation = await this.conversationModel.insertMany([
      { role: RoleChat.USER, content: prompt, userId: userId },
      { role: RoleChat.AI, content: contentAi, userId: userId },
    ]);
    return createdConversation;
  }

  async getConversationsByUserId(userId: string) {
    const conversations = await this.conversationModel
      .find({ userId })
      .sort({ createAt: 1 })
      .exec();
    return conversations;
  }
}
