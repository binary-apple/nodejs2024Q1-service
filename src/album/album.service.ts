import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumStore } from './album_store/album_store';

@Injectable()
export class AlbumService {
  constructor(private readonly albumStore: AlbumStore) {}

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
    return this.albumStore.remove(id);
  }
}
