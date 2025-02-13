import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from './conversation.repository';
import { Conversation, ConversationSchema } from './conversation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
    ChatModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
})
export class ConversationModule {}
