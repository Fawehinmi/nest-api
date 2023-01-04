import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProductRepository } from './product.repository';
import { ProductResolver } from './product.resolver';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductService, ProductRepository, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
