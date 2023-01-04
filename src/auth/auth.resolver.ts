import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './auth.dto';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authSvc: AuthService) {}

  // @UseGuards(JwtAuthGuard)
  @Mutation((returns) => Auth, { name: 'signIn' })
  async signIn(
    @Args('email')
    email: string,
    @Args('password')
    password: string,
  ) {
    const auth = await this.authSvc.login({ email, password });
    return auth;
  }
}
