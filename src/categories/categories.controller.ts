import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoriesService) {}

    @Get()
    getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAllCategories();
    }

    @Post()
    addCategory(@Body() createCategorydto: CreateCategoryDTO): Promise<Category> {
        return this.categoryService.addCategory(createCategorydto);
    }

    // Add a subCategories
    @Post(":id/subCategory")
    addSubCategory(
        @Param('id') idParent: string,
        @Body() createCategoryDto: CreateCategoryDTO
    ): Promise<Category> {
        return this.categoryService.AddSubCategory(idParent, createCategoryDto);
    }
}
