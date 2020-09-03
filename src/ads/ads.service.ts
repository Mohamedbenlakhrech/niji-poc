import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ad } from './schemas/ads.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdsService {
    constructor(@InjectModel(Ad.name) private adModel: Model <Ad>) {}

    async findAll(): Promise<Ad[]> {
        const users = await this.adModel.find().exec();
        return users;
    } 
}
