import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @IsUUID()
  @PrimaryColumn()
  id: string; // uuid v4

  @Column({ length: 30 })
  name: string;
  @Column()
  grammy: boolean;

  constructor(source: Partial<Artist>) {
    Object.assign(this, source);
  }
}
