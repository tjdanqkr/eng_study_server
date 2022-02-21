import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly type: number;

  @IsNotEmpty()
  readonly precedence: number;

  @IsNotEmpty()
  readonly isEnd: boolean;
}
