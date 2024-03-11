import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

export class ArtistStore {
  private store: { [id: string]: Artist } = {};

  create(createArtistDto: CreateArtistDto): Artist | undefined {
    const newArtist: Artist = new Artist({
      id: randomUUID(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    this.store[newArtist.id] = newArtist;
    return newArtist;
  }

  findAll(): Artist[] {
    return Object.values(this.store);
  }

  findOne(id: string): Artist | undefined {
    return this.store[id];
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist | undefined {
    const item = this.findOne(id);
    if (!item) {
      return;
    }
    const newArtist: Artist = new Artist({
      ...item,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    });
    this.store[id] = newArtist;
    return newArtist;
  }

  remove(id: string): boolean {
    if (this.store[id]) {
      delete this.store[id];
      return true;
    }
    return false;
  }
}
