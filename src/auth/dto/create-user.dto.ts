import {
  IsBooleanString,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @Length(10, 11)
  readonly phoneNum: number;

  @IsNotEmpty()
  readonly bigCategory: number;

  @IsNotEmpty()
  readonly middleCategory: number;

  @IsNotEmpty()
  readonly startTime: Date;

  @IsNotEmpty()
  readonly endTime: Date;

  @IsNotEmpty()
  @IsBooleanString()
  readonly isAdmin: boolean;
}
