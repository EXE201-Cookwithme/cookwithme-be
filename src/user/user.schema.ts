import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/comment.schema';
import { UserPlan, UserRole } from 'src/constants';
import { Post } from 'src/post/post.schema';

export type UserDocument = HydratedDocument<User>;
@Schema({ versionKey: false })
export class User {
  _id: string;
  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ enum: UserPlan, default: UserPlan.FREE })
  plan: UserPlan;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
