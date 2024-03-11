import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './artist_store/artist_store';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistStore: ArtistStore,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

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
    // remove all artistId from albums
    this.albumService
      .findAll()
      .filter((album) => album.artistId === id)
      .forEach((album) => {
        this.albumService.update(album.id, {
          ...album,
          artistId: null,
        });
      });
    // remove all artistId from tracks
    this.trackService
      .findAll()
      .filter((track) => track.artistId === id)
      .forEach((track) => {
        this.trackService.update(track.id, {
          ...track,
          artistId: null,
        });
      });

    return this.artistStore.remove(id);
  }
}
