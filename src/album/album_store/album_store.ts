import { randomUUID } from 'crypto';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

export class AlbumStore {
  private store: { [id: string]: Album } = {};

  create(createAlbumDto: CreateAlbumDto): Album | undefined {
    const newAlbum: Album = new Album({
      id: randomUUID(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
    this.store[newAlbum.id] = newAlbum;
    return newAlbum;
  }

  findAll(): Album[] {
    return Object.values(this.store);
  }

  findOne(id: string): Album | undefined {
    return this.store[id];
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album | undefined {
    const item = this.findOne(id);
    if (!item) {
      return;
    }
    const newAlbum: Album = new Album({
      ...item,
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId,
    });
    this.store[id] = newAlbum;
    return newAlbum;
  }

  remove(id: string): boolean {
    if (this.store[id]) {
      delete this.store[id];
      return true;
    }
    return false;
  }
}
