import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/comment.schema';
import { Post } from 'src/post/post.schema';

export type UserDocument = HydratedDocument<User>;
@Schema({ versionKey: false })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  clerkid: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Post.name }])
  postId: Post[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Comment.name }])
  commentId: Comment[];

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
