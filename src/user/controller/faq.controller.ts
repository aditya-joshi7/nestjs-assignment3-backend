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
  IFaqProviderName,
  IUserHistoryProviderName,
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
import { CreateFaqDto, GetFaqDtoRes } from '../dto/faq.dto';
import { IFaqProvider } from '../interface/providerInterface/iFaq.provider';
import { CreateUserHistoryDto } from '../dto/userHistory.dto';
import { IUserHistoryProvider } from '../interface/providerInterface/iUserHistory.provider';

@ApiTags('FAQ')
@Controller('faq/v1')
export class FaqController {
  constructor(
    @Inject(IFaqProviderName)
    private readonly _faqProvider: IFaqProvider,
    @Inject(IUserHistoryProviderName)
    private readonly _userHistoryProvider: IUserHistoryProvider,
  ) {}

  @Post('/addfaq')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createUser(@Body() createFaqDto: CreateFaqDto): Promise<any> {
    const reponse: any = await this._faqProvider.createFaq(createFaqDto);
    return reponse;
  }

  @Get('/fetchallfaqs')
  async fetchAllFaqs(): Promise<GetFaqDtoRes[]> {
    const reponse: GetFaqDtoRes[] = await this._faqProvider.fetchAllFaqs();
    return reponse;
  }

  @Post('/adduserhistory')
  async addUserHistory(
    @Body() createUserHistoryDto: CreateUserHistoryDto,
  ): Promise<any> {
    const reponse: any[] = await this._userHistoryProvider.createUserHistory(
      createUserHistoryDto,
    );
    return reponse;
  }

  @Get('/getuserhistory')
  @UseGuards(AuthGuard)
  async fetchAllUserHistory(
    @Query('email') email: string,
  ): Promise<GetFaqDtoRes[]> {
    const reponse: GetFaqDtoRes[] =
      await this._userHistoryProvider.fetchAllUserHistory(email);
    return reponse;
  }
}
