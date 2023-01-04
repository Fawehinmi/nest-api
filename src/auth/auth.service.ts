import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersSvc: UsersService,
    private readonly jwtSvc: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersSvc.findOne({ email });

    if (!user) throw new ApolloError('Invalid username or password');

    const userPassCorrect = await bcrypt.compare(pass, user.password);
    if (userPassCorrect) {
      delete user.password;
      return user;
    } else {
      throw new ApolloError('Invalid username or password');
    }
  }

  async login(user: any) {
    const userValidated = await this.validateUser(user.email, user.password);

    if (userValidated) {
      const token = this.jwtSvc.sign({
        _id: userValidated._id,
        email: userValidated.email,
        roles: userValidated.roles,
        name: `${userValidated.firstName} ${userValidated.lastName} `,
      });
      return {
        token: token,
        roles: userValidated.roles,
        userId: userValidated._id,
        userValidatedName: userValidated.name,
        phoneNumber: userValidated.phoneNumber,

        // tokenExpiresIn: this.configSvc.get("jwt.tokenTimeSpan"),
        name: `${userValidated.firstName} ${userValidated.lastName}`,
      };
    }
  }
  user = async (userId) => {
    return await this.usersSvc.findOne({ _id: userId });
  };
}
