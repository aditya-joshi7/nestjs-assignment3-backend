import { Module } from '@nestjs/common';
import {
  IAuthProviderName,
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

//
const userPvd = { provide: IUserProviderName, useClass: UserProvider };
const userRepo = { provide: IUserRepositoryName, useClass: UserRepository };
const authPvd = { provide: IAuthProviderName, useClass: AuthProvider };

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  controllers: [UserController],
  exports: [userPvd, userRepo, authPvd],
  providers: [userPvd, userRepo, authPvd],
})
export class UserModule {}
