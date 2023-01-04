import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  _id: Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  category: string;
  @Prop()
  quantity: number;
  @Prop()
  detail: string;
  @Prop()
  categoryId: Types.ObjectId;
  @Prop()
  priceBefore: Types.ObjectId;
  @Prop()
  currentPrice: Types.ObjectId;
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updateAt: Date;

  // Image to be done soon
}

export const ProductSchema = SchemaFactory.createForClass(Product);
