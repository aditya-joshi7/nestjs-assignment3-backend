import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IUserHistoryRepository } from '../interface/repositoryInterface/iUserHistory.repository';
import { UserHistory } from '../schemas/userhistory.schema';

@Injectable()
export class UserHistoryRepository implements IUserHistoryRepository {
  constructor(
    @InjectModel(UserHistory.name)
    private _userHistoryModel: mongoose.Model<UserHistory>,
  ) {}

  createUserHistory = async (userHistory: UserHistory): Promise<any> => {
    try {
      const res = await this._userHistoryModel.create(userHistory);
      return res;
    } catch (error) {
      throw new BadRequestException("Can't Create duplicate history!!");
    }
  };
  fetchAllUserHistory = async (condtions: any): Promise<UserHistory[]> => {
    return this._userHistoryModel.find(condtions);
  };
}
