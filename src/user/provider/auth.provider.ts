import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';

import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { IAuthProvider } from '../interface/providerInterface/iAuth.provider';
import { CreateUserDto, GetUserDtoReq, GetUserDtoRes } from '../dto/user.dto';
import { IUserProviderName } from 'src/common/constants/interface.constants';
import { IUserProvider } from '../interface/providerInterface/iUser.provider';
import { JwtService } from '@nestjs/jwt';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthProvider implements IAuthProvider {
  constructor(
    @Inject(IUserProviderName)
    private readonly _userProvider: IUserProvider,
    private readonly _jwtService: JwtService,
  ) {}
  signup = async (createUserDtoReq: CreateUserDto): Promise<any> => {
    const req = new GetUserDtoReq();
    req.email = createUserDtoReq.email;
    const users = await this._userProvider.fetchUser(req);
    if (users) {
      throw new BadRequestException('email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const password = createUserDtoReq.password;
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const newUser: CreateUserDto = new CreateUserDto();
    newUser.email = createUserDtoReq.email;
    newUser.password = result;
    newUser.roles = createUserDtoReq.roles;
    const user = await this._userProvider.createUser(newUser);
    return user;
  };

  signin = async (getUserDtoReq: GetUserDtoReq): Promise<any> => {
    const user: any = await this._userProvider.fetchUser(getUserDtoReq);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(getUserDtoReq.password, salt, 32)) as Buffer;
    if (storedHash != hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    const payload = { sub: user._id, username: user.email, roles: user.roles };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  };
}
