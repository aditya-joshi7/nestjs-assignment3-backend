import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserProvider } from '../interface/providerInterface/iUser.provider';
import {
  IFaqRepositoryName,
  IUserHistoryRepositoryName,
  IUserRepositoryName,
} from 'src/common/constants/interface.constants';
import { IUserRepository } from '../interface/repositoryInterface/iUser.repository';
import { CreateUserDto, GetUserDtoReq } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import { IFaqProvider } from '../interface/providerInterface/iFaq.provider';
import { CreateFaqDto, GetFaqDtoRes } from '../dto/faq.dto';
import { IFaqRepository } from '../interface/repositoryInterface/iFaq.repository';
import { Faq } from '../schemas/faq.schema';
import { IUserHistoryProvider } from '../interface/providerInterface/iUserHistory.provider';
import { CreateUserHistoryDto } from '../dto/userHistory.dto';
import { IUserHistoryRepository } from '../interface/repositoryInterface/iUserHistory.repository';
import { UserHistory } from '../schemas/userhistory.schema';

@Injectable()
export class UserHistoryProvider implements IUserHistoryProvider {
  constructor(
    @Inject(IUserHistoryRepositoryName)
    private readonly _userHistoryRepository: IUserHistoryRepository,
    @Inject(IFaqRepositoryName)
    private readonly _faqRepository: IFaqRepository,
  ) {}

  createUserHistory = async (
    createUserHistoryDto: CreateUserHistoryDto,
  ): Promise<any> => {
    const newHistory: UserHistory = new UserHistory();
    newHistory.email = createUserHistoryDto.email;
    newHistory.question_id = createUserHistoryDto.question_id;
    const res = await this._userHistoryRepository.createUserHistory(newHistory);
    return res;
  };

  fetchAllUserHistory = async (email: string): Promise<GetFaqDtoRes[]> => {
    console.log(email);
    const allUserHistory: any =
      await this._userHistoryRepository.fetchAllUserHistory({ email: email });
    let response: GetFaqDtoRes[] = [];
    if (!allUserHistory) {
      return response;
    }
    const faqIds: string[] = [];
    for (const uh of allUserHistory) {
      faqIds.push(uh.question_id);
    }
    const allFaqs = await this._faqRepository.findAllFaqs(faqIds);
    for (const faq of allFaqs) {
      const f: GetFaqDtoRes = new GetFaqDtoRes();
      f.answer = faq.answer;
      f.question = faq.question;
      response.push(f);
    }
    return response;
  };
}
