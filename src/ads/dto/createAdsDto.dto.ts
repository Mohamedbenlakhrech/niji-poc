import { ApiProperty } from "@nestjs/swagger";
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from "src/categories/schemas/category.schema";
 
export class CreateAdsDTO {
    @ApiProperty()
    title: string;

    @ApiProperty()
    price: number;
}