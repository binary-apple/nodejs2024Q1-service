import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersPasswordDto } from './dto/update-users-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const timestamp = Date.now();
    const createdUser = this.usersRepository.create(
      new User({
        id: randomUUID(),
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: timestamp,
        updatedAt: timestamp,
      }),
    );

    return await this.usersRepository.save(createdUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateUsersPasswordDto: UpdateUsersPasswordDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user || updateUsersPasswordDto.oldPassword != user.password) return;

    return await this.usersRepository.save({
      ...user,
      password: updateUsersPasswordDto.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    this.usersRepository.remove(user);
  }
}
