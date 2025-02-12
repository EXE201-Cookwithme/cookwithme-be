import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkshopDocument = HydratedDocument<Workshop>;
@Schema({ versionKey: false })
export class Workshop {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  hostName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ required: true })
  link: string;
}
export const WorkshopSchema = SchemaFactory.createForClass(Workshop);
