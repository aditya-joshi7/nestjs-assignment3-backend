import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  IAuthProviderName,
  IUserProviderName,
} from 'src/common/constants/interface.constants';
import { IUserProvider } from '../interface/providerInterface/iUser.provider';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, GetUserDtoReq, GetUserDtoRes } from '../dto/user.dto';
import { IAuthProvider } from '../interface/providerInterface/iAuth.provider';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

@ApiTags('User')
@Controller('user/v1')
export class UserController {
  constructor(
    @Inject(IUserProviderName)
    private readonly _userProvider: IUserProvider,
    @Inject(IAuthProviderName)
    private readonly _authProvider: IAuthProvider,
  ) {}

  @Post('/createuser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const reponse: String = await this._userProvider.createUser(createUserDto);
    return reponse;
  }

  @Get('/fetchUser')
  async fetchUser(@Query() getUserDtoReq: GetUserDtoReq): Promise<any> {
    const reponse: GetUserDtoRes = await this._userProvider.fetchUser(
      getUserDtoReq,
    );
    return reponse;
  }

  @Post('/signup')
  async signUpUser(@Body() req: CreateUserDto): Promise<any> {
    const user = await this._authProvider.signup(req);
    return user;
  }

  @Post('/signin')
  async signin(@Body() req: CreateUserDto): Promise<any> {
    const user = await this._authProvider.signin(req);
    return user;
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
