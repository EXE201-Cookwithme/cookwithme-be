import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false })
export class Post {}

export const PostSchema = SchemaFactory.createForClass(Post);
