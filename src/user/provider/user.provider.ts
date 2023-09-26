import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserProvider } from '../interface/providerInterface/iUser.provider';
import { IUserRepositoryName } from 'src/common/constants/interface.constants';
import { IUserRepository } from '../interface/repositoryInterface/iUser.repository';
import { CreateUserDto, GetUserDtoReq, GetUserDtoRes } from '../dto/user.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserProvider implements IUserProvider {
  constructor(
    @Inject(IUserRepositoryName)
    private readonly _userRepository: IUserRepository,
  ) {}

  createUser = async (createUserDtoReq: CreateUserDto): Promise<any> => {
    const req = new GetUserDtoReq();
    req.email = createUserDtoReq.email;
    const user: GetUserDtoRes = await this.fetchUser(req);
    if (!user) {
      const newUser: User = new User();
      newUser.email = createUserDtoReq.email;
      newUser.password = createUserDtoReq.password;
      newUser.roles = createUserDtoReq.roles;
      const res = await this._userRepository.createUser(newUser);
      if (res) {
        return res;
      } else {
        throw new BadRequestException('Something went wrong!!');
      }
    }
    throw new BadRequestException('email in use');
  };
  fetchUser = async (getUserDtoReq: GetUserDtoReq): Promise<any> => {
    const users: User[] = await this._userRepository.fetchUser({
      email: getUserDtoReq.email,
    });
    if (users && users.length > 0) {
      return users[0];
    }
    return null;
  };
}
