import { Query, Resolver } from '@nestjs/graphql';
import { GqlAuthorize } from 'src/auth/decorators';
import { Role } from 'src/enum';
import { User } from './users.dto';

@Resolver()
export class UsersResolver {
  @Query(() => String)
  @GqlAuthorize([Role.SuperAdmin])
  async hello() {
    return 'hello';
  }
}
