import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Question {
  @Prop({ unique: true, type: 'number' })
  num: number;

  @Prop()
  title: string;

  @Prop({ type: Object })
  question: Problem;

  @Prop()
  bigCategory: number;

  @Prop()
  middleCategory: number;

  @Prop()
  endCategory: number;
}

export type Problem = {
  survey: string[];
  translation: string[];
};

export const QuestionSchema = SchemaFactory.createForClass(Question);

export type QuestionDocument = Question & Document;
