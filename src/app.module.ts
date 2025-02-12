import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { WorkshopModule } from './workshop/workshop.module';
import { ConversationModule } from './conversation/conversation.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    PostModule,
    CategoryModule,
    CommentModule,
    UserModule,
    WorkshopModule,
    ConversationModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
