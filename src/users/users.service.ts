import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './users.schema';
import { UsersRepository } from './users.repository';
import { helper } from 'src/helper';
// import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private userRepo: UsersRepository) {}

  async create(user: User): Promise<User> {
    user.id = await this.userRepo.generateAccountId();
    const user1 = await this.userRepo.findOne({ email: user.email });

    if (user1 != null) {
      throw new HttpException(
        'Email Already Exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    try {
      const hashPassword = await helper.hash(user.password);

      const rs = await this.userRepo.create({
        ...user,
        password: hashPassword,
      } as any);

      return rs;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(model: Partial<User>): Promise<User> {
    return this.userRepo.findOne(model);
  }
}
