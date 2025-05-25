import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskGroupDocument = HydratedDocument<TaskGroup>;

@Schema({ timestamps: true })
export class TaskGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon_url: string;

  @Prop({ required: true })
  userId: string;
}

export const TaskGroupSchema = SchemaFactory.createForClass(TaskGroup);
