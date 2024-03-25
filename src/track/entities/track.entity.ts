import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {
  @IsUUID()
  @PrimaryColumn()
  id: string; // uuid v4
  @Column({ length: 30 })
  name: string;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist
  @Column({ nullable: true })
  albumId: string | null; // refers to Album
  @Column({ nullable: true })
  duration: number; // integer number

  constructor(source: Partial<Track>) {
    Object.assign(this, source);
  }
}
