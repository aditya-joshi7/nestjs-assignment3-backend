import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interface/repositoryInterface/iUser.repository';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private _userModel: mongoose.Model<User>,
  ) {}

  createUser = async (user: User): Promise<any> => {
    return this._userModel.create(user);
  };
  fetchUser = async (condtions: any): Promise<any> => {
    return this._userModel.find(condtions);
  };
}
