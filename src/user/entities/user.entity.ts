import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class User {
  @IsUUID()
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(source: Partial<User>) {
    Object.assign(this, source);
  }
}