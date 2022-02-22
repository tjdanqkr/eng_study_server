import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.gaurd';
import { AdminAuthGuard } from 'src/auth/gaurds/admin-auth.gaurd';

@Controller('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AdminAuthGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':num')
  findOne(@Param('num') num: number) {
    return this.questionService.findOne(num);
  }

  @UseGuards(AdminAuthGuard)
  @Patch(':num')
  update(
    @Param('num') num: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(num, updateQuestionDto);
  }

  @UseGuards(AdminAuthGuard)
  @Delete(':num')
  remove(@Param('num') num: number) {
    return this.questionService.remove(num);
  }
}
