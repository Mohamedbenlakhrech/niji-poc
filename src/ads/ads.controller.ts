import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Ad } from './schemas/ads.schema';
import { CreateAdsDTO } from './dto/createAdsDto.dto';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('ads')
@UseGuards(AuthGuard())
export class AdsController {
    constructor(private adsService: AdsService ){}

    @Get()
    getAllAds(): Promise <Ad[]> {
        return this.adsService.findAll();
    }

    @Post()
    createAds(
        @Body() createAdsDto: CreateAdsDTO, @GetUser() user: User,
    ): Promise<Ad> {
        return this.adsService.createAds(createAdsDto, user);
    }
}