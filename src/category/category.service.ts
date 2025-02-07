import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepository.getAllCategories();
    return { data: categories, message: 'Categories fetched successfully' };
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.getCategoryById(id);
    return { data: category, message: 'Category fetched successfully' };
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category =
      await this.categoryRepository.createCategory(createCategoryDto);
    return { data: category, message: 'Category created successfully' };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.deleteCategory(id);
    return { data: category, message: 'Category deleted successfully' };
  }
}
