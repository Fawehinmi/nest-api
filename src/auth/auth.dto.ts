import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  userId: string;
  @Field()
  name: string;
  @Field()
  token: string;
  // @Field((type) => [Role])
  // roles: Array<Role>;

  @Field()
  phoneNumber: string;
  // @Field()
  // tokenExpiresIn: number;
}
