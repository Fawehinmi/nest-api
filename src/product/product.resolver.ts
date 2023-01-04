import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { model, Types } from 'mongoose';
import { GqlAuthorize, GqlCurrentUser } from 'src/auth/decorators';
import { Role } from 'src/enum';

import { CreateProductInput, Product, UpdateProductInput } from './product.dto';
import { ProductService } from './product.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productSvc: ProductService) {}

  @Mutation((returns) => Product, { name: 'createProduct' })
  @GqlAuthorize([Role.SuperAdmin])
  async create(
    @GqlCurrentUser() user: any,
    @Args('product') product: CreateProductInput,
  ) {
    return await this.productSvc.create({
      ...product,
    } as any);
  }

  @Mutation((returns) => Product, { name: 'updateProduct' })
  @GqlAuthorize([Role.SuperAdmin])
  async update(
    @Args('id') id: string,
    @Args('product') args: UpdateProductInput,
  ) {
    return await this.productSvc.update(id, {
      ...args,
    } as any);
  }

  @Query((returns) => Product, { name: 'productDetail' })
  async productDetail(@Args('id') id: string) {
    return await this.productSvc.findById(id);
  }

  @Mutation((returns) => Boolean, { name: 'deleteProduct' })
  async deleteProduct(@Args('id') id: string) {
    return await this.productSvc.delete(id);
  }

  // @Query((returns) => Product, { name: 'findProduct' })
  // async findProduct(@Args('query') query: ProductQueryInput) {
  //   return await this.productSvc.findOne(query);
  // }

  @Query((returns) => Product, { name: 'findProductById' })
  async findOne(@Args('id') id: string) {
    return this.productSvc.findById(id);
  }
}
