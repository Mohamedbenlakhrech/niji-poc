import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ad } from './schemas/ads.schema';
import { Model } from 'mongoose';
import { CreateAdsDTO } from './dto/createAdsDto.dto';
import { User } from 'src/users/schemas/user.schema';
import { UpdateAdsDTO } from './dto/updateAdsDto.dto';
import { Category } from 'src/categories/schemas/category.schema';

@Injectable()
export class AdsService {
    constructor(
        @InjectModel(Ad.name) private adModel: Model <Ad>,
        @InjectModel(Category.name) private categModel: Model <Category>
    ) {}

    async findAll(): Promise<Ad[]> {
        const ads = await this.adModel.find().populate(
            { path: 'categories', select: 'name' },
            ).exec();
        return ads;
    }

    async createAds(createAdsDto: CreateAdsDTO, user: User): Promise<Ad> {
        const { title, price } = createAdsDto;
        try {
            const newAds = new this.adModel();
            const findCateg = await this.categModel.findOne({ _id: "5f5780dad601fe4e58e0f9de" });
            newAds.title = title;
            newAds.price = price;
            newAds.user = user._id;
            user.ads.push(newAds._id);
            newAds.categories.push(findCateg._id);

            await user.save();
            await newAds.save();
            return newAds;

        } catch(err) {
            return err;
        }
    }

    async updateAds(idAds: string, updateAdsDto: UpdateAdsDTO): Promise<Ad> {
        try {
            const findAd = await this.adModel.findOneAndUpdate({ _id: idAds }, updateAdsDto, { new: true });
            return findAd;
        } catch(error) {
            throw new NotFoundException("Ads Not Found!")
        }
    }
}
