import { CreateFaqDto, GetFaqDtoRes } from 'src/user/dto/faq.dto';
export interface IFaqProvider {
  createFaq: (createFaqDto: CreateFaqDto) => Promise<any>;
  fetchAllFaqs: () => Promise<GetFaqDtoRes[]>;
}
