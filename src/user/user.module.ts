import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserStore } from './user_store.ts/user_store';

@Module({
  controllers: [UserController],
  providers: [UserService, UserStore],
})
export class UserModule {}
