import { GetFaqDtoRes } from 'src/user/dto/faq.dto';
import { CreateUserHistoryDto } from 'src/user/dto/userHistory.dto';
export interface IUserHistoryProvider {
  createUserHistory: (
    createUserHistoryDto: CreateUserHistoryDto,
  ) => Promise<any>;
  fetchAllUserHistory: (email: string) => Promise<GetFaqDtoRes[]>;
}
