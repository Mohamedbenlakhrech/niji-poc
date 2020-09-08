import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model <Category>) {}

    async getAllCategories(): Promise<Category[]> {
        try {
            const findCategs = await this.categoryModel.find().exec();
            return findCategs;
        } catch(error) {
            return error;
        }
    }

    async addCategory(createCategoryDto: CreateCategoryDTO): Promise<Category> {
        const { name } = createCategoryDto;

        try {
            const newCateg = new this.categoryModel(createCategoryDto);
            newCateg.name = name;
            await newCateg.save();
            return newCateg;
        } catch(error) {
            return error;
        }
    }

    async AddSubCategory(idParent: string, createCategoryDto: CreateCategoryDTO) {
        const { name } = createCategoryDto;
        try {
            const findParent = await this.categoryModel.findOne({ _id: idParent });
            if(findParent) {
                const newSubCateg = new this.categoryModel();
                newSubCateg.name = name;
                newSubCateg.parent = findParent;
                await newSubCateg.save();
                return newSubCateg;
            } else {
                throw new NotFoundException("Parent Category Not Found");
            }
        }catch(error) {
            return error
        }
    }
}
