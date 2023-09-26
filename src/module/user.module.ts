import { Module } from '@nestjs/common';
import {
  IAuthProviderName,
  IFaqProviderName,
  IFaqRepositoryName,
  IUserHistoryProviderName,
  IUserHistoryRepositoryName,
  IUserProviderName,
  IUserRepositoryName,
} from 'src/common/constants/interface.constants';
import { CommonModule } from './common.module';
import { UserProvider } from 'src/user/provider/user.provider';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserController } from 'src/user/controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { AuthProvider } from 'src/user/provider/auth.provider';
import { JwtModule } from '@nestjs/jwt';
import { FaqProvider } from 'src/user/provider/faq.provider';
import { FaqRepository } from 'src/user/repository/faq.respository';
import { Faq, FaqSchema } from 'src/user/schemas/faq.schema';
import { FaqController } from 'src/user/controller/faq.controller';
import {
  UserHistory,
  UserHistorySchema,
} from 'src/user/schemas/userhistory.schema';
import { UserHistoryProvider } from 'src/user/provider/userHistory.provider';
import { UserHistoryRepository } from 'src/user/repository/userHistory.repository';

const userPvd = { provide: IUserProviderName, useClass: UserProvider };
const userRepo = { provide: IUserRepositoryName, useClass: UserRepository };
const authPvd = { provide: IAuthProviderName, useClass: AuthProvider };
const faqPvd = { provide: IFaqProviderName, useClass: FaqProvider };
const faqRepo = { provide: IFaqRepositoryName, useClass: FaqRepository };
const uHiPvd = {
  provide: IUserHistoryProviderName,
  useClass: UserHistoryProvider,
};
const uHiRepo = {
  provide: IUserHistoryRepositoryName,
  useClass: UserHistoryRepository,
};

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Faq.name, schema: FaqSchema },
      { name: UserHistory.name, schema: UserHistorySchema },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  controllers: [UserController, FaqController],
  exports: [userPvd, userRepo, authPvd, faqPvd, faqRepo, uHiPvd, uHiRepo],
  providers: [userPvd, userRepo, authPvd, faqPvd, faqRepo, uHiPvd, uHiRepo],
})
export class UserModule {}
