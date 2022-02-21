import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';

import { AdminAuthGuard } from 'src/auth/gaurds/admin-auth.gaurd';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const num = (await this.findAll()).length;
    const category = new this.categoryModel({ ...createCategoryDto, num });
    Logger.verbose(category);
    return await category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find({}, {}, { sort: 'num' });
  }

  async findOne(num: number): Promise<Category> {
    return this.categoryModel.findOne({ num });
  }

  async findLowRank(precedence: number): Promise<Category[]> {
    return this.categoryModel.findOne({ precedence });
  }

  async update(num: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.updateOne({ num }, updateCategoryDto);
  }

  async remove(num: number) {
    return await this.categoryModel.deleteOne({ num });
  }
}
