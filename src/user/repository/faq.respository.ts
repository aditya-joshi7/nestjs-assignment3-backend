import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { IFaqRepository } from '../interface/repositoryInterface/iFaq.repository';
import { Faq } from '../schemas/faq.schema';

@Injectable()
export class FaqRepository implements IFaqRepository {
  constructor(
    @InjectModel(Faq.name)
    private _faqModel: mongoose.Model<Faq>,
  ) {}

  createFaq = async (faq: Faq): Promise<any> => {
    return this._faqModel.create(faq);
  };
  fetchAllFaq = async (): Promise<any> => {
    return this._faqModel.find();
  };
  findAllFaqs = async (ids: string[]): Promise<any> => {
    const response = await this._faqModel.find({ _id: { $in: ids } });
    return response;
  };
}
