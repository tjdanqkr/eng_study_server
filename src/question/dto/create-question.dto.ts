import { IsNotEmpty, IsString } from 'class-validator';
import { Problem } from '../schemas/question.schema';

export class CreateQuestionDto {
  @IsNotEmpty()
  num: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  question: Problem;

  @IsNotEmpty()
  bigCategory: number;

  @IsNotEmpty()
  middleCategory: number;

  @IsNotEmpty()
  endCategory: number;
}
