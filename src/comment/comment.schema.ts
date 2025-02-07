import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from 'src/post/post.schema';
import { User } from 'src/user/user.schema';
export type CategoryDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false })
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
  postId: Post;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
