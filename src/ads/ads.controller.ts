import { Controller, Get } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ad } from './schemas/ads.schema';

@Controller('ads')
export class AdsController {
    constructor(private adsService: AdsService ){}

    @Get()
    getAllAds(): Promise <Ad[]> {
        return this.adsService.findAll();
    }
}
