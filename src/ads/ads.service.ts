import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ad } from './schemas/ads.schema';
import { Model } from 'mongoose';
import { CreateAdsDTO } from './dto/createAdsDto.dto';
import { User } from 'src/users/schemas/user.schema';
import { UpdateAdsDTO } from './dto/updateAdsDto.dto';

@Injectable()
export class AdsService {
    constructor(@InjectModel(Ad.name) private adModel: Model <Ad>) {}

    async findAll(): Promise<Ad[]> {
        const ads = await this.adModel.find().populate({ path: 'user', select: 'userName' }).exec();
        return ads;
    }

    async createAds(createAdsDto: CreateAdsDTO, user: User): Promise<Ad> {
        const { title, price } = createAdsDto;
        console.log(`User ${user}`);
        try {
            const newAds = new this.adModel(createAdsDto);
            newAds.user = user._id;
            user.ads.push(newAds._id);
            await user.save();
            await newAds.save();
            return newAds;

        } catch(err) {
            console.log(err);
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
