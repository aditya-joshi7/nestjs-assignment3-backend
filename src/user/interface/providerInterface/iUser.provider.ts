import {
  CreateUserDto,
  GetUserDtoReq,
  GetUserDtoRes,
} from 'src/user/dto/user.dto';

export interface IUserProvider {
  createUser: (createUserDto: CreateUserDto) => Promise<any>;
  fetchUser: (getUserDtoReq: GetUserDtoReq) => Promise<any>;
}
