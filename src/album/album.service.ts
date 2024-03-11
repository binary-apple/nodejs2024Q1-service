import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore } from './album_store/album_store';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumStore: AlbumStore,
    private readonly trackService: TrackService,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumStore.create(createAlbumDto);
  }

  findAll() {
    return this.albumStore.findAll();
  }

  findOne(id: string) {
    return this.albumStore.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albumStore.update(id, updateAlbumDto);
  }

  remove(id: string) {
    // remove all albumId from tracks
    this.trackService
      .findAll()
      .filter((track) => track.albumId === id)
      .forEach((track) => {
        this.trackService.update(track.id, {
          ...track,
          albumId: null,
        });
      });
    return this.albumStore.remove(id);
  }
}
