import { Faq } from 'src/user/schemas/faq.schema';

export interface IFaqRepository {
  createFaq: (createFaqDto: Faq) => Promise<any>;
  fetchAllFaq: () => Promise<any>;
  findAllFaqs: (ids: string[]) => Promise<any>;
}
