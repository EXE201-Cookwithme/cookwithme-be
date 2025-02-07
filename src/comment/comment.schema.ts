import { Post } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type CategoryDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false })
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  postId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
