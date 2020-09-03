import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/niji-poc'), AuthModule, UsersModule, AdsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
