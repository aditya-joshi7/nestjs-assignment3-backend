import { UserHistory } from 'src/user/schemas/userhistory.schema';

export interface IUserHistoryRepository {
  createUserHistory: (userHistory: UserHistory) => Promise<any>;
  fetchAllUserHistory: (condtions: any) => Promise<UserHistory[]>;
}
