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
import { AdminAuthGuard } from 'src/auth/gaurds/admin-auth.gaurd';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.gaurd';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':num')
  findOne(@Param('num') num: number): Promise<Category> {
    return this.categoryService.findOne(num);
  }

  @Get('/low/:precedence')
  findRowRank(@Param('precedence') precedence: number): Promise<Category[]> {
    return this.categoryService.findLowRank(precedence);
  }

  @Patch(':num')
  @UseGuards(AdminAuthGuard)
  update(
    @Param('num') num: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(num, updateCategoryDto);
  }

  @Delete(':num')
  @UseGuards(AdminAuthGuard)
  remove(@Param('num') num: number) {
    return this.categoryService.remove(num);
  }
}
