// import { Optional } from '@nestjs/common';
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
  // @IsUUID()
  // @Optional()
  artistId: string | null; // refers to Artist

  constructor(source: Partial<Album>) {
    Object.assign(this, source);
  }
}
