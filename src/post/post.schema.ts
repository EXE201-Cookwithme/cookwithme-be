import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/category.schema';
import { User } from 'src/user/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  categoryId: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
