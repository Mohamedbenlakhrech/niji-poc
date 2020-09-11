import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AdImage } from './adsImages.schema';
import { User } from 'src/users/schemas/user.schema';
import { Category } from 'src/categories/schemas/category.schema';


@Schema()
export class Ad extends Document {  
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'AdImage' }])
  images: AdImage[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }])
  categories: [Category];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AdSchema = SchemaFactory.createForClass(Ad);
