// import { Optional } from '@nestjs/common';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Album {
  @IsUUID()
  @PrimaryColumn()
  id: string; // uuid v4
  @Column({ length: 30 })
  name: string;
  @Column()
  year: number;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Exclude()
  @Column({ default: false })
  isFavorite: boolean;

  constructor(source: Partial<Album>) {
    Object.assign(this, source);
  }
}
