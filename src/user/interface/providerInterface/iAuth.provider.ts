import { CreateUserDto } from 'src/user/dto/user.dto';

export interface IAuthProvider {
  signup: (createUserDto: CreateUserDto) => Promise<any>;
  signin: (createUserDto: CreateUserDto) => Promise<any>;
}
