import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserRoleTypes } from './users/users.schema';
import { UsersService } from './users/users.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/dodavah_stage'),
    AuthModule,
    ProductModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly userSvc: UsersService) {
    this.seed();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer;
    // .apply(LoggerMiddleware)
    // .forRoutes("*")
    // .apply(graphqlUploadExpress({ maxFileSize: 90000000, maxFiles: 10 }))
    // .forRoutes("graphql");
  }

  async seed() {
    const account = await this.userSvc.findOne({
      email: 'dodavahwigs@gmail.com',
    });
    if (account == null) {
      await this.userSvc.create({
        firstName: 'Favour',
        lastName: 'Fawehinmi',
        phoneNumber: '09035553473',
        email: 'dodavahwigs@gmail.com',
        password: 'Welcome123',
        active: true,
        roles: [UserRoleTypes.SuperAdmin],
        age: 0,
      } as any);
    }
  }
}
