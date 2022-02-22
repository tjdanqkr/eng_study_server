import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const num = (await this.findAll()).length;
    const question = new this.questionModel({ ...createQuestionDto, num });

    return await question.save();
  }

  async findAll(): Promise<Question[]> {
    return this.questionModel.find();
  }

  async findOne(num: number): Promise<Question> {
    return this.questionModel.findOne({ num });
  }

  async update(num: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.questionModel.updateOne(
      { num },
      updateQuestionDto,
      {},
      (err, res) => {
        if (err) {
          return err;
        }
        return 'Succesfully saved.';
      },
    );
  }

  async remove(num: number) {
    return await this.questionModel.deleteOne({ num }, (err) => {
      if (err) return err;
      return;
    });
  }
}
