import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Ad, AdSchema } from 'src/ads/schemas/ads.schema';
import { AdImage, AdImageSchema } from './schemas/adsImages.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CategorySchema, Category } from 'src/categories/schemas/category.schema';

@Module({
  imports: [MongooseModule.forFeature(
    [
      { name: Ad.name, schema: AdSchema },
      { name: AdImage.name, schema: AdImageSchema },
      { name: Category.name, schema: CategorySchema }
    ]), AuthModule],
  controllers: [AdsController],
  providers: [AdsService]
})
export class AdsModule {}
