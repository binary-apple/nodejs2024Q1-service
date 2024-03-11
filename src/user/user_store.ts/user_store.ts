import { randomUUID } from 'crypto';
// import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUsersPasswordDto } from '../dto/update-users-password.dto';
import { User } from '../entities/user.entity';

export class UserStore {
  private store: { [id: string]: User } = {};

  create(createUserDto: CreateUserDto): User | undefined {
    const timestamp = Date.now();
    const newUser: User = new User({
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    this.store[newUser.id] = newUser;
    return newUser;
  }

  findAll(): User[] {
    return Object.values(this.store);
  }

  findOne(id: string): User | undefined {
    return this.store[id];
  }

  update(
    id: string,
    updateUsersPasswordDto: UpdateUsersPasswordDto,
  ): User | undefined | number {
    const item = this.findOne(id);
    if (!item) {
      return 404;
    }
    if (item.password !== updateUsersPasswordDto.oldPassword) {
      return 403;
    }
    const newUser: User = new User({
      ...item,
      password: updateUsersPasswordDto.newPassword,
      version: item.version + 1,
      updatedAt: Date.now(),
    });
    this.store[id] = newUser;
    return newUser;
  }

  remove(id: string): boolean {
    if (this.store[id]) {
      delete this.store[id];
      return true;
    }
    return false;
  }
}
