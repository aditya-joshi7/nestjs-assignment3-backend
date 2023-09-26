import { Module } from '@nestjs/common';
import { CommonModule } from './common.module';
import { UserModule } from './user.module';
//import { DBModule } from './db.module';
import { DBModule } from './db.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [CommonModule, UserModule, DBModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
