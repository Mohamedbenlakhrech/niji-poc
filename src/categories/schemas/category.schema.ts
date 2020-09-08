import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Category extends Document {
  
  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', default: null })
  parent: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);