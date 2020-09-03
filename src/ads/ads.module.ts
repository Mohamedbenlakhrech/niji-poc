import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Ad, AdSchema } from 'src/ads/schemas/ads.schema';
import { AdImage, AdImageSchema } from './schemas/adsImages.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Ad.name, schema: AdSchema },
      { name: AdImage.name, schema: AdImageSchema }
    ])],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
