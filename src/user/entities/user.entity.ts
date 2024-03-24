import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @IsUUID()
  @PrimaryColumn()
  id: string; // uuid v4
  @Column({
    length: 30,
  })
  login: string;

  @Exclude()
  @Column({
    length: 30,
  })
  password: string;
  @Column()
  version: number; // integer number, increments on update
  @Column('bigint')
  createdAt: number; // timestamp of creation
  @Column('bigint')
  updatedAt: number; // timestamp of last update

  constructor(source: Partial<User>) {
    Object.assign(this, source);
  }
}
