import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Ad } from './ads.schema';

@Schema()
export class AdImage extends Document {
  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Ad' })
  ad: Ad;

}

export const AdImageSchema = SchemaFactory.createForClass(AdImage);