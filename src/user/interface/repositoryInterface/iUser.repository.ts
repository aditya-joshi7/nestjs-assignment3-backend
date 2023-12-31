import { User } from 'src/user/schemas/user.schema';

export interface IUserRepository {
  createUser: (createUserDto: User) => Promise<any>;
  fetchUser: (condtions: any) => Promise<any>;
}
