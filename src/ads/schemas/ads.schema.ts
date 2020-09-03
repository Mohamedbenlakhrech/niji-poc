
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { AdImage } from './adsImages.schema';


@Schema()
export class Ad extends Document {  
  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'AdImage' }])
  images: AdImage;

}

export const AdSchema = SchemaFactory.createForClass(Ad);
