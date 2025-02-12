import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleChat } from 'src/constants';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ versionKey: false })
export class Conversation {
  @Prop({ required: true })
  role: RoleChat;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  createAt: Date;

  @Prop({ required: true })
  userId: string;
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
