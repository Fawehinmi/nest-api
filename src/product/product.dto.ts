import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field((type) => ID)
  _id?: string | any;
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  detail: string;
  @Field((type) => Number, { nullable: true })
  price: number;
  @Field((type) => Number, { nullable: true })
  quantity: number;
  @Field((type) => String, { nullable: true })
  category: string;
  @Field((type) => ID, { nullable: true })
  categoryId: String;
  @Field((type) => Number, { nullable: true })
  createdAt: number;
  @Field((type) => Number, { nullable: true })
  updatedAt: number;
}

@InputType()
export class ProductCommonInput {
  @Field((type) => String, { nullable: true })
  name: string;
  @Field((type) => String, { nullable: true })
  detail: string;
  @Field((type) => Number, { nullable: true })
  price: number;
  @Field((type) => Number, { nullable: true })
  quantity: number;

  @Field((type) => ID, { nullable: true })
  categoryId: string;
}

@InputType()
export class CreateProductInput extends ProductCommonInput {}

@InputType()
export class UpdateProductInput extends ProductCommonInput {}
