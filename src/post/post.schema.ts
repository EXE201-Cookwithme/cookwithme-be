import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/category.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {
  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  titleUnaccent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: Date.now })
  createAt: Date;

  @Prop({ required: true })
  links: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
