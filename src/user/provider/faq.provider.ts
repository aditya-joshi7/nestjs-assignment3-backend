import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserProvider } from '../interface/providerInterface/iUser.provider';
import {
  IFaqRepositoryName,
  IUserRepositoryName,
} from 'src/common/constants/interface.constants';
import { IUserRepository } from '../interface/repositoryInterface/iUser.repository';
import { CreateUserDto, GetUserDtoReq } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { IFaqProvider } from '../interface/providerInterface/iFaq.provider';
import { CreateFaqDto, GetFaqDtoRes } from '../dto/faq.dto';
import { IFaqRepository } from '../interface/repositoryInterface/iFaq.repository';
import { Faq } from '../schemas/faq.schema';

@Injectable()
export class FaqProvider implements IFaqProvider {
  constructor(
    @Inject(IFaqRepositoryName)
    private readonly _faqRepository: IFaqRepository,
  ) {}

  createFaq = async (createFaq: CreateFaqDto): Promise<any> => {
    const newFaq: Faq = new Faq();
    newFaq.answer = createFaq.answer;
    newFaq.question = createFaq.question;
    const res = await this._faqRepository.createFaq(newFaq);
    return res;
  };

  fetchAllFaqs = async (): Promise<GetFaqDtoRes[]> => {
    const faqs: any = await this._faqRepository.fetchAllFaq();
    const allFaqs: GetFaqDtoRes[] = [];
    for (const faq of faqs) {
      const f: GetFaqDtoRes = new GetFaqDtoRes();
      f.answer = faq.answer;
      f.question = faq.question;
      f.id = faq._id;
      allFaqs.push(f);
    }
    return allFaqs;
  };
}
