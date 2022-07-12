import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interface/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoriesModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;

    const categoryExist = await this.categoriesModel
      .findOne({ category })
      .exec();

    if (categoryExist) {
      throw new BadRequestException(`Categoria ${category} já cadastrada`);
    }

    const categoryCreated = new this.categoriesModel(createCategoryDTO);

    return await categoryCreated.save();
  }
}
