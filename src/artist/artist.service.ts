import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './artist_store/artist_store';

@Injectable()
export class ArtistService {
  constructor(private readonly artistStore: ArtistStore) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistStore.create(createArtistDto);
  }

  findAll() {
    return this.artistStore.findAll();
  }

  findOne(id: string) {
    return this.artistStore.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistStore.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistStore.remove(id);
  }
}
