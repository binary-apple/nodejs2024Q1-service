import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersPasswordDto } from './dto/update-users-password.dto';
import { UserStore } from './user_store.ts/user_store';

@Injectable()
export class UserService {
  constructor(private readonly userStore: UserStore) {}

  create(createUserDto: CreateUserDto) {
    return this.userStore.create(createUserDto);
  }

  findAll() {
    return this.userStore.findAll();
  }

  findOne(id: string) {
    return this.userStore.findOne(id);
  }

  update(id: string, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    return this.userStore.update(id, updateUsersPasswordDto);
  }

  remove(id: string) {
    return this.userStore.remove(id);
  }
}
