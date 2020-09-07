import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Ad } from 'src/ads/schemas/ads.schema';


@Schema()
export class User extends Document {
  
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Ad' }])
  ads: [Ad];
}

export const UserSchema = SchemaFactory.createForClass(User);